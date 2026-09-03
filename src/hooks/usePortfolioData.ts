import { useQuery } from '@tanstack/react-query';
import type { Professional } from '@/types/database';

export const usePortfolioData = () => {
  return useQuery<Professional, Error>({
    queryKey: ['portfolioData'],
    queryFn: async () => {
      // In development, fetch from the live Express API.
      // In production (GitHub Pages), fetch from the statically generated JSON file.
      const url = import.meta.env.DEV ? '/api/portfolio' : '/data/portfolio.json';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const rawData = await response.json();
      
      // Recursively map 'pt-br' keys to 'pt' to match the frontend i18n language code
      const mapPtBrToPt = (obj: any): any => {
        if (Array.isArray(obj)) {
          return obj.map(mapPtBrToPt);
        } else if (obj !== null && typeof obj === 'object') {
          const newObj: any = {};
          for (const key in obj) {
            if (key === 'pt-br' || key === 'pt-BR') {
              const mappedValue = mapPtBrToPt(obj[key]);
              newObj['pt'] = mappedValue;
              newObj['pt-BR'] = mappedValue;
              newObj['pt-br'] = mappedValue;
            } else {
              newObj[key] = mapPtBrToPt(obj[key]);
            }
          }
          return newObj;
        }
        return obj;
      };

      return mapPtBrToPt(rawData);
    },
    // The portfolio data is relatively static during a session, 
    // so we can set a high staleTime to prevent unnecessary re-fetching.
    staleTime: 5 * 60 * 1000, 
  });
};
