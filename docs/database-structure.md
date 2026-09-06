# pllima.com Document Database Structure

**Design Paradigm:** NoSQL / Document-Based (JSON)
**Primary Key:** `_id` (UUID/ObjectId)

## Custom Types for Dynamic i18n and Data
- **LocalizedString:** `{ [languageCode: string]: string }`
- **LocalizedArray:** `{ [languageCode: string]: string[] }`
- **YearMonth:** `string` // Format: "YYYY-MM" (e.g., "2024-01")

---

## Collection: professionals

- `_id`: objectId
- `name`: string
- `contact`: object
   - `email`: string
   - `phone`: string
   - `website`: string
   - `linkedin`: string
   - `github`: string
- `location`: LocalizedString
- `metadata`: object
   - `profilePicturePath`: string
   - `defaultLanguage`: string
- `i18n_strings`: object
   - `tagline`: LocalizedString
   - `about`: LocalizedString

### EMBEDDED SUB-DOCUMENTS
*(In MongoDB, array items inherently get their own inner `_id`)*

- `focusAreas`: array of objects
   - `_id`: objectId
   - `icon`: string
   - `title`: LocalizedString
   - `description`: LocalizedString
   - `metadata`: { `displayOrder`: integer, `isActive`: boolean }

- `skills`: array of objects
   - `_id`: objectId
   - `category`: string // "hard_skill" | "soft_skill"
   - `subCategory`: string // e.g., "Languages", "Frameworks & Libraries", "Tools & Environments", "Core Competencies"
   - `name`: LocalizedString
   - `proficiencyLevel`: integer // Optional: for AI filtering
   - `metadata`: { `displayOrder`: integer }

- `languages`: array of objects
   - `_id`: objectId
   - `language`: LocalizedString
   - `level`: LocalizedString
   - `frameworkOrStandard`: string // e.g., "CEFR"
   - `metadata`: { `displayOrder`: integer }

- `experiences`: array of objects
   - `_id`: objectId
   - `companyUrl`: string
   - `timeline`: object
      - `startDate`: YearMonth
      - `endDate`: YearMonth | null // null indicates "Present"
   - `metadata`: object
      - `showOnWebsite`: boolean
      - `targetRoles`: string[]
      - `techStackRefs`: objectId[] // References to nested skill `_id`s
   - `title`: LocalizedString
   - `company`: LocalizedString
   - `location`: LocalizedString
   - `description`: LocalizedArray

- `education`: array of objects
   - `_id`: objectId
   - `institutionUrl`: string
   - `timeline`: object
      - `startDate`: YearMonth
      - `endDate`: YearMonth
   - `metadata`: object
      - `ongoing`: boolean
      - `showOnWebsite`: boolean
      - `type`: string
   - `degree`: LocalizedString
   - `institution`: LocalizedString
   - `country`: LocalizedString
   - `description`: LocalizedArray

- `projects`: array of objects
   - `_id`: objectId
   - `url`: string
   - `timeline`: object
      - `startDate`: YearMonth
      - `endDate`: YearMonth | null // null indicates "Present"
   - `metadata`: object
      - `showOnWebsite`: boolean
      - `priorityScore`: integer
      - `coverImagePath`: string
   - `name`: LocalizedString
   - `briefDescription`: LocalizedString
   - `description`: LocalizedArray
   - `techStack`: LocalizedArray

- `volunteering`: array of objects
   - `_id`: objectId
   - `organizationUrl`: string
   - `timeline`: object
      - `startDate`: YearMonth
      - `endDate`: YearMonth | null // null indicates "Present"
   - `metadata`: { `showOnWebsite`: boolean }
   - `roleTitle`: LocalizedString
   - `organization`: LocalizedString
   - `location`: LocalizedString
   - `description`: LocalizedArray

- `achievements`: array of objects
   - `_id`: objectId
   - `link`: string
   - `dateIssued`: YearMonth[]
   - `metadata`: object
      - `linkText`: LocalizedString
      - `showOnWebsite`: boolean
   - `title`: LocalizedString
   - `issuer`: LocalizedString

---

## Collection: resumes

*(Stores historical records of generated CVs. Separated from the 'professionals' collection.)*

- `_id`: objectId
- `professionalId`: objectId // Points to the professional
- `metadata`: object
   - `generatedAt`: date (ISO 8601)
   - `targetLanguage`: string
   - `targetRole`: string
   - `targetCompany`: string
   - `templateUsed`: string // e.g., "tech_financial_2026"
- `contentRefs`: object (References to sub-document `_id`s inside the professional document)
   - `includedExperienceIds`: objectId[]
   - `includedProjectIds`: objectId[]
   - `includedEducationIds`: objectId[]
   - `includedVolunteeringIds`: objectId[]
   - `includedAchievementIds`: objectId[]
   - `includedSkillIds`: objectId[]
- `finalOutput`: object
   - `latexPromptContext`: string
   - `rawLatexCode`: string
   - `pdfUrl`: string

---

## Collection: coverLetters

*(Stores historical records of generated cover letters)*

- `_id`: objectId
- `professionalId`: objectId // Points to the professional
- `metadata`: object
   - `generatedAt`: date (ISO 8601)
   - `targetLanguage`: string
   - `targetRole`: string
   - `targetCompany`: string
   - `templateUsed`: string
- `finalOutput`: object
   - `latexPromptContext`: string // Context + Job Description used
   - `rawLatexCode`: string
   - `pdfUrl`: string
