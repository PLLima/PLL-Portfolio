import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TS_FILE = path.join(__dirname, '../src/types/database.ts');
const MD_FILE = path.join(__dirname, '../docs/database-structure.md');

// Read TS file
const tsContent = fs.readFileSync(TS_FILE, 'utf8');

// Simple regex parser to extract interfaces
function extractInterfaces(content) {
  const interfaces = {};
  const regex = /export interface (\w+) (\{[\s\S]*?\n\})/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const name = match[1];
    const body = match[2];
    interfaces[name] = body;
  }
  return interfaces;
}

const interfaces = extractInterfaces(tsContent);

function parseType(typeStr, propName) {
  typeStr = typeStr.trim();
  if (propName === '_id') return 'objectId';
  if (typeStr === 'string' || typeStr === 'number' || typeStr === 'boolean') {
    if (typeStr === 'number') return 'integer';
    return typeStr;
  }
  if (typeStr === 'LanguageCode') return 'string';
  if (typeStr === 'YearMonth') return 'YearMonth';
  if (typeStr === 'Date | string') return 'date (ISO 8601)';
  if (typeStr === 'LocalizedString') return 'LocalizedString';
  if (typeStr === 'LocalizedArray') return 'LocalizedArray';
  if (typeStr.includes('[]')) {
    const base = typeStr.replace('[]', '');
    if (base === 'string') {
      if (propName.toLowerCase().includes('id')) return 'objectId[]';
      return 'string[]';
    }
    if (base === 'YearMonth') return 'YearMonth[]';
    return `array of objects`;
  }
  if (typeStr.startsWith("'") || typeStr.includes('|')) return 'string';
  return typeStr; // fallback
}

function parseInterfaceBody(bodyStr, indent = '') {
  let lines = bodyStr.split('\n');
  let result = [];
  let inNested = false;
  let nestedLines = [];
  let nestedProp = '';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line || line === '{' || line === '}') continue;
    
    // Ignore comments
    if (line.startsWith('//')) continue;

    // Check for nested object start
    if (line.includes(': {')) {
      inNested = true;
      nestedProp = line.split(':')[0].trim();
      result.push(`${indent}- \`${nestedProp}\`: object`);
      continue;
    }

    if (inNested) {
      if (line === '};') {
        inNested = false;
      } else {
        // parse nested property
        const parts = line.split(':');
        if (parts.length >= 2) {
          const pName = parts[0].trim();
          let pTypeAndComment = parts.slice(1).join(':').trim();
          let comment = '';
          if (pTypeAndComment.includes('//')) {
            const split = pTypeAndComment.split('//');
            pTypeAndComment = split[0].trim();
            comment = ' // ' + split[1].trim();
          }
          pTypeAndComment = pTypeAndComment.replace(/;$/, '');
          result.push(`${indent}   - \`${pName}\`: ${parseType(pTypeAndComment, pName)}${comment}`);
        }
      }
      continue;
    }

    // Normal property
    const parts = line.split(':');
    if (parts.length >= 2) {
      const pName = parts[0].trim().replace('?', '');
      let pTypeAndComment = parts.slice(1).join(':').trim();
      let comment = '';
      if (pTypeAndComment.includes('//')) {
        const split = pTypeAndComment.split('//');
        pTypeAndComment = split[0].trim();
        comment = ' // ' + split[1].trim();
      }
      pTypeAndComment = pTypeAndComment.replace(/;$/, '');
      
      const parsedType = parseType(pTypeAndComment, pName);
      result.push(`${indent}- \`${pName}\`: ${parsedType}${comment}`);
    }
  }
  return result;
}

function generateMarkdown() {
  let md = `# pllima.com Document Database Structure

**Design Paradigm:** NoSQL / Document-Based (JSON)
**Primary Key:** \`_id\` (UUID/ObjectId)

## Custom Types for Dynamic i18n and Data
- **LocalizedString:** \`{ [languageCode: string]: string }\`
- **LocalizedArray:** \`{ [languageCode: string]: string[] }\`
- **YearMonth:** \`string\` // Format: "YYYY-MM" (e.g., "2024-01")

---

## Collection: professionals
`;

  // Parse Professional
  const profBody = interfaces['Professional'];
  if (profBody) {
    const profLines = parseInterfaceBody(profBody);
    // Filter out array properties to put them in embedded sub-docs
    const mainProps = [];
    const arrayProps = [];
    
    // Quick hack for Professional: arrays are FocusArea[], etc.
    // Let's just process it manually to match exactly the format
    let rawLines = profBody.split('\n');
    let inNested = false;
    for (let line of rawLines) {
      line = line.trim();
      if (!line || line === '{' || line === '}' || line.startsWith('//')) continue;
      
      if (line.includes(': {')) {
        inNested = true;
        mainProps.push(`- \`${line.split(':')[0].trim()}\`: object`);
        continue;
      }
      if (inNested) {
        if (line === '};') inNested = false;
        else {
          let parts = line.split(':');
          let pName = parts[0].trim();
          let typeStr = parts[1].split('//')[0].replace(';','').trim();
          mainProps.push(`   - \`${pName}\`: ${parseType(typeStr, pName)}`);
        }
        continue;
      }
      
      let parts = line.split(':');
      let pName = parts[0].trim();
      let typeStr = parts.slice(1).join(':').split('//')[0].replace(';','').trim();
      if (typeStr.includes('[]')) {
        arrayProps.push({ prop: pName, interfaceName: typeStr.replace('[]', '') });
      } else {
        mainProps.push(`- \`${pName}\`: ${parseType(typeStr, pName)}`);
      }
    }
    
    md += '\n' + mainProps.join('\n') + '\n\n';
    
    md += `### EMBEDDED SUB-DOCUMENTS\n*(In MongoDB, array items inherently get their own inner \`_id\`)*\n\n`;
    
    for (const arrProp of arrayProps) {
      md += `- \`${arrProp.prop}\`: array of objects\n`;
      const innerBody = interfaces[arrProp.interfaceName];
      if (innerBody) {
        md += parseInterfaceBody(innerBody, '   ').join('\n') + '\n\n';
      }
    }
  }

  md += `---\n\n## Collection: resumes\n\n*(Stores historical records of generated CVs. Separated from the 'professionals' collection.)*\n\n`;
  if (interfaces['Resume']) {
    md += parseInterfaceBody(interfaces['Resume']).join('\n') + '\n\n';
  }

  md += `---\n\n## Collection: coverLetters\n\n*(Stores historical records of generated cover letters)*\n\n`;
  if (interfaces['CoverLetter']) {
    md += parseInterfaceBody(interfaces['CoverLetter']).join('\n') + '\n';
  }

  return md;
}

try {
  const markdownContent = generateMarkdown();
  
  // Use realpath to resolve symlinks so we overwrite the actual target file
  let targetFile = MD_FILE;
  if (fs.existsSync(MD_FILE)) {
    targetFile = fs.realpathSync(MD_FILE);
  }
  
  fs.writeFileSync(targetFile, markdownContent);
  console.log(`Successfully updated ${targetFile} from src/types/database.ts`);
} catch (error) {
  console.error("Error generating database structure:", error);
  process.exit(1);
}
