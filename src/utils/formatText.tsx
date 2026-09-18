import React from 'react';

/**
 * Parses markdown emphasis and returns an array of React nodes.
 * According to rules:
 * - *word* is translated to bold
 * - **word** is translated to italic
 * Never print the raw asterisks.
 */
export function formatTextWithEmphasis(text: string): React.ReactNode[] {
  if (!text) return [];

  // Split the text while keeping the delimiters: **...** for italic and *...* for bold
  // We use non-greedy matching .*? to match the innermost tags
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Italic: **word**
      return (
        <em key={index} className="italic text-foreground">
          {part.slice(2, -2)}
        </em>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      // Bold: *word*
      return (
        <strong key={index} className="font-bold text-foreground">
          {part.slice(1, -1)}
        </strong>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export interface TextToken {
  text: string;
  type: 'bold' | 'italic' | 'normal';
}

/**
 * Parses markdown emphasis and returns an array of tokens.
 * Useful for character-by-character animations like Typewriter.
 */
export function parseTextToTokens(text: string): TextToken[] {
  if (!text) return [];
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  const parts = text.split(regex);
  return parts.map(part => {
    if (part.startsWith('**') && part.endsWith('**')) return { text: part.slice(2, -2), type: 'italic' };
    if (part.startsWith('*') && part.endsWith('*')) return { text: part.slice(1, -1), type: 'bold' };
    return { text: part, type: 'normal' };
  });
}
