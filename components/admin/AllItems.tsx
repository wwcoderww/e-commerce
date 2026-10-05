'use client';
import { useGetProductsQuery } from '@/state/slices/productSlice';

export default function AllItems() {
  const { data: allItems } = useGetProductsQuery();

  return (
    <div className="w-1/4">
      {allItems?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
