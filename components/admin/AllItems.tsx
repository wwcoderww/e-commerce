'use client';
import { useGetProductsQuery } from '@/state/slices/productSlice';
import { productType } from '@/types/productType';
import { useState } from 'react';
import EditItem from './EditItem';

const selectClass = 'bg-primary/40 opacity-100';
const labelClass = ' opacity-80 hover:opacity-100 cursor-pointer';

export default function AllItems() {
  const [selected, setSelected] = useState<productType | null>(null);
  const { data: allItems } = useGetProductsQuery();

  function handleClick(item: productType) {
    setSelected(item);
  }

  return (
    <>
      <div className="px-4">
        {allItems?.map((item) => (
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
