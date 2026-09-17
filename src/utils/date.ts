// Maps the app's language code to standard Intl locales
const localeMap: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  pt: 'pt-BR',
  'pt-br': 'pt-BR',
};

const formatMonthYear = (yearMonth: string, lang: string): string => {
  const [year, month] = yearMonth.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  const normalizedLang = lang.toLowerCase();
  
  const formatter = new Intl.DateTimeFormat(localeMap[normalizedLang] || 'en-US', {
    month: 'short',
    year: 'numeric'
  });
  
  let formatted = formatter.format(date);
  
  // Specific casing per locale based on user request (e.g., "Out 2024", "Oct 2024")
  // Intl usually provides title case or lowercase for months depending on locale.
  // We can capitalize the first letter to ensure consistency like "Oct 2024".
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  return formatted;
};

interface DateRangeOptions {
  startDate: string;
  endDate?: string | null;
  ongoing?: boolean;
  lang: string;
}

export const formatDateRange = ({ startDate, endDate, ongoing, lang }: DateRangeOptions): string => {
  if (!startDate) return '';

  const startFormatted = formatMonthYear(startDate, lang);

  // If start is equal to end, return single date (no hyphen)
  if (startDate === endDate) {
    return startFormatted;
  }

  // If no endDate and ongoing is true (or just null endDate implies ongoing)
  if (!endDate || ongoing) {
    const presentMap: Record<string, string> = {
      en: 'Present',
      fr: 'Aujourd\'hui',
      pt: 'Atualmente',
      'pt-br': 'Atualmente'
    };
    const presentStr = presentMap[lang.toLowerCase()] || 'Present';
    return `${startFormatted} – ${presentStr}`;
  }

  const endFormatted = formatMonthYear(endDate, lang);
  return `${startFormatted} – ${endFormatted}`;
};

export const formatAchievementYears = (dates: string[]): string => {
  if (!dates || dates.length === 0) return '';
  
  // Extract years and deduplicate
  const years = Array.from(new Set(dates.map(date => date.split('-')[0]))).sort();

  if (years.length === 1) return years[0];
  if (years.length === 2) return `${years[0]} & ${years[1]}`;
  
  const lastYear = years.pop();
  return `${years.join(', ')} & ${lastYear}`;
};

export interface EducationStatusTexts {
  completed: string;
  expected: string;
}

export const formatEducationYear = (
  dateToDisplay: string | null,
  ongoing: boolean,
  lang: string,
  statusTexts: EducationStatusTexts
): string => {
  const isOngoing = ongoing || !dateToDisplay;
  const targetDate = dateToDisplay ? dateToDisplay : new Date().toISOString().slice(0, 7);
  const formattedDate = formatMonthYear(targetDate, lang);

  return isOngoing ? `${statusTexts.expected} ${formattedDate}` : `${statusTexts.completed} ${formattedDate}`;
};
