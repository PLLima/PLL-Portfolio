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
  
  const formatter = new Intl.DateTimeFormat(localeMap[lang] || 'en-US', {
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
      fr: 'Présent',
      pt: 'Presente',
      'pt-br': 'Presente'
    };
    const presentStr = presentMap[lang] || 'Present';
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

export const formatEducationYear = (endDate: string | null, ongoing: boolean, lang: string): string => {
  const isOngoing = ongoing || !endDate;
  const year = endDate ? endDate.split('-')[0] : new Date().getFullYear().toString(); // Default if ongoing and no end date

  const statusMap: Record<string, { completed: string, expected: string }> = {
    en: { completed: 'Completed:', expected: 'Expected:' },
    fr: { completed: 'Diplôme obtenu :', expected: 'Diplôme attendu :' },
    pt: { completed: 'Concluído:', expected: 'Previsão:' },
    'pt-br': { completed: 'Concluído:', expected: 'Previsão:' }
  };

  const statusTexts = statusMap[lang] || statusMap['en'];
  
  if (isOngoing) {
    return `${statusTexts.expected} ${year}`;
  } else {
    return `${statusTexts.completed} ${year}`;
  }
};
