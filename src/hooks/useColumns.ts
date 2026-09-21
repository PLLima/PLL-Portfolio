import { useState, useEffect } from 'react';

export function useColumns(breakpoints = { md: 768, lg: 1024 }) {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= breakpoints.lg) {
        setColumns(3);
      } else if (width >= breakpoints.md) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints.lg, breakpoints.md]);

  return columns;
}
