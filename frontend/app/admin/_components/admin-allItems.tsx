'use client';
import { useGetProductsQuery } from '@/state/api/productApi';
import { productType } from '@/types/productType';
import { useState } from 'react';
import EditItem from './admin-editItem';
import sortList from '@/utils/sortList';
import LoadingSpinner from '@/components/loadingSpinner';

const selectClass = 'bg-primary/40 opacity-100';
const labelClass = ' opacity-80 hover:opacity-100 cursor-pointer';

export default function AllItems() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: allItems, isLoading } = useGetProductsQuery();
  if (!allItems) return null;
  const selected = allItems.find((item) => item.id === selectedId);
  // Click item function
  function handleClick(item: productType) {
    setSelectedId(item.id);
  }
  // Filter items
  const filteredItems = sortList(allItems, 'az');

  return (
    <>
      <div className="h-full scrollbar-thin overflow-y-scroll px-4 pb-8">
        {isLoading && <LoadingSpinner />}
        {filteredItems?.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={`${item === selected && selectClass} ${labelClass}`}
          >
            {item.name}
          </div>
        ))}
      </div>
      {selected && <EditItem item={selected} />}
    </>
  );
}
