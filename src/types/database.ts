// ==========================================
// 1. UTILITY TYPES (i18n & Primitives)
// ==========================================

/** 
 * Currently supported language codes.
 * The "string & {}" allows IDE autocomplete but accepts other languages in the future.
 */
export type LanguageCode = 'en' | 'fr' | 'pt-br' | (string & {});

export type LocalizedString = Record<LanguageCode, string>;
export type LocalizedArray = Record<LanguageCode, string[]>;

/** Format: "YYYY-MM" (e.g. "2024-01") */
export type YearMonth = string; 

// ==========================================
// 2. EMBEDDED SUB-DOCUMENTS (Portfolio Items)
// ==========================================

export interface FocusArea {
  _id: string;
  icon: string; // String reference to the LucideIcon
  title: LocalizedString;
  description: LocalizedString;
  metadata: {
    displayOrder: number;
    isActive: boolean;
  };
}

export interface Skill {
  _id: string;
  category: 'hard_skill' | 'soft_skill';
  subCategory: string; // e.g., "Languages", "Frameworks & Libraries", etc.
  name: LocalizedString;
  proficiencyLevel?: number; // 1-5 (Optional, useful for AI processing)
  metadata: {
    displayOrder: number;
  };
}

export interface Language {
  _id: string;
  language: LocalizedString;
  level: LocalizedString;
  frameworkOrStandard: string; // e.g., "CEFR"
  metadata: {
    displayOrder: number;
  };
}

export interface Experience {
  _id: string;
  companyUrl: string;
  timeline: {
    startDate: YearMonth;
    endDate: YearMonth | null; // null = "Present"
  };
  metadata: {
    showOnWebsite: boolean;
    targetRoles: string[];
    techStackRefs: string[]; // Array of IDs referencing Skills
  };
  title: LocalizedString;
  company: LocalizedString;
  location: LocalizedString;
  description: LocalizedArray;
}

export interface Education {
  _id: string;
  institutionUrl: string;
  timeline: {
    startDate: YearMonth;
    endDate: YearMonth;
  };
  metadata: {
    ongoing: boolean;
    showOnWebsite: boolean;
    type: 'degree' | 'language_course' | 'certification' | (string & {});
  };
  degree: LocalizedString;
  institution: LocalizedString;
  country: LocalizedString;
  description: LocalizedArray;
}

export interface Project {
  _id: string;
  url: string;
  timeline: {
    startDate: YearMonth;
    endDate: YearMonth | null;
  };
  metadata: {
    showOnWebsite: boolean;
    priorityScore: number;
    coverImagePath: string;
  };
  name: LocalizedString;
  briefDescription: LocalizedString;
  description: LocalizedArray;
  techStack: LocalizedArray;
}

export interface Volunteering {
  _id: string;
  organizationUrl: string;
  timeline: {
    startDate: YearMonth;
    endDate: YearMonth | null;
  };
  metadata: {
    showOnWebsite: boolean;
  };
  roleTitle: LocalizedString;
  organization: LocalizedString;
  location: LocalizedString;
  description: LocalizedArray;
}

export interface Achievement {
  _id: string;
  link: string;
  dateIssued: YearMonth[];
  metadata: {
    linkText: LocalizedString;
    showOnWebsite: boolean;
  };
  title: LocalizedString;
  issuer: LocalizedString;
}

// ==========================================
// 3. MAIN DOCUMENT (The Professional)
// ==========================================

export interface Professional {
  _id: string;
  name: string;
  contact: {
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    github: string;
  };
  location: LocalizedString;
  metadata: {
    profilePicturePath: string;
    defaultLanguage: LanguageCode;
  };
  i18n_strings: {
    tagline: LocalizedString;
    about: LocalizedString;
  };
  
  // Nested Arrays
  focusAreas: FocusArea[];
  skills: Skill[];
  languages: Language[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  volunteering: Volunteering[];
  achievements: Achievement[];
}

// ==========================================
// 4. EXTERNAL COLLECTIONS (AI History)
// ==========================================

export interface Resume {
  _id: string;
  professionalId: string; // Reference to Professional._id
  metadata: {
    generatedAt: Date | string; // Depends on how the API fetch is performed
    targetLanguage: LanguageCode;
    targetRole: string;
    targetCompany: string;
    targetCountry: string;
    templateUsed: string;
  };
  contentRefs: {
    includedExperienceIds: string[];
    includedProjectIds: string[];
    includedEducationIds: string[];
    includedVolunteeringIds: string[];
    includedAchievementIds: string[];
    includedSkillIds: string[];
  };
  finalOutput: {
    latexPromptContext: string;
    rawLatexCode: string;
    pdfUrl: string;
  };
}

export interface CoverLetter {
  _id: string;
  professionalId: string; // Reference to Professional._id
  metadata: {
    generatedAt: Date | string;
    targetLanguage: LanguageCode;
    targetRole: string;
    targetCompany: string;
    targetCountry: string;
    templateUsed: string;
  };
  finalOutput: {
    latexPromptContext: string;
    rawLatexCode: string;
    pdfUrl: string;
  };
}
