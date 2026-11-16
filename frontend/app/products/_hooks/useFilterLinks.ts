import { productType } from '@/types/productType';
import { useEffect, useMemo, useState } from 'react';

export type filterBy = 'nameaz' | 'nameza' | 'price+' | 'price-' | 'catagory';

export default function useFilterLinks(
  data: productType[] | undefined,
  search: string,
  filterBy: filterBy,
) {
  // Debounce
  const [debounceValue, setDebounceValue] = useState<string>(search);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(search);
    }, 300);
    return () => clearTimeout(timeOut);
  }, [search]);
  // useMemo
  return useMemo(() => {
    if (!data) return;

    const filtered = search
      ? data.filter((product) =>
          product.name.toLowerCase().includes(debounceValue.toLowerCase()),
        )
      : data;

    switch (filterBy) {
      case 'nameaz':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case 'nameza':
        return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      case 'price+':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'price-':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'catagory':
        return [...filtered].sort((a, b) => {
          if (!a.category && !b.category) return 0;
          if (!a.category) return 1;
          if (!b.category) return -1;
          return a.category.localeCompare(b.category);
        });
      default:
        return filtered;
    }
  }, [data, debounceValue, filterBy]);
}
