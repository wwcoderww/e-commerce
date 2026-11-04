import { cartItemType } from '@/types/cartItemType';
import Buttons from './list/checkout-list-buttons';
import Description from './list/checkout-list-description';
import Picture from './list/checkout-list-picture';
import { productType } from '@/types/productType';
import { useState } from 'react';
import ProductOverlay from '@/app/products/_components/products-overlay';

type listProps = {
  cart: cartItemType[];
};

export default function List({ cart }: listProps) {
  const [selected, setSelected] = useState<productType | null>(null);

  return (
    <div className="mx-auto flex w-75 flex-col divide-y-3 divide-primary rounded-md border-4 sm:mx-0 sm:w-full">
      {cart?.map((item) => (
        <div
          key={item.id}
          className="flex bg-gray-600 capitalize hover:cursor-pointer hover:text-gray-300"
          onClick={() => setSelected(item)}
        >
          <Picture item={item} />
          <Description item={item} />
          <Buttons item={item} />
        </div>
      ))}
      {selected && (
        <ProductOverlay setSelected={setSelected} selected={selected} />
      )}
    </div>
  );
}
