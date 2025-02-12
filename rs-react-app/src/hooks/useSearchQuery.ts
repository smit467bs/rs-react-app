import { useEffect, useState } from 'react';

export function useSearchQuery(): [string, (query: string) => void] {
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('searchQuery') || '';
  });

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  return [searchQuery, setSearchQuery];
}
