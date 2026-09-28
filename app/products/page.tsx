'use client';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/product/ProductCard';
import ProductOverlay from '../../components/product/ProductOverlay';
import ProductSearch from '../../components/product/ProductSearch';
import { productType } from '@/types/productType';

export default function Products() {
  const [data, setData] = useState<productType[] | null>(null);
  const [selected, setSelected] = useState<productType | null>(null);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then((res) => res.json())
      .then((data) => {
        const adjustedData = data.products.map((item) => {
          const {
            images: [firstImage],
            ...restofProduct
          } = item;
          return { image: firstImage, ...restofProduct };
        });
        console.log(adjustedData);
        setData(adjustedData);
      });
  }, []);

  const filteredData = data?.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (!data) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center text-center text-8xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col px-2">
      <ProductSearch setSearch={setSearch} />
      <div className="flex flex-wrap justify-center gap-12 pb-20">
        {filteredData?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setSelected={setSelected}
          />
        ))}
        {selected && (
          <ProductOverlay setSelected={setSelected} selected={selected} />
        )}
      </div>
    </div>
  );
}
