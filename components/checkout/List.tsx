import { cartItemType } from '@/types/cartItemType';
import Buttons from './list/Buttons';
import Description from './list/Description';
import Picture from './list/Picture';
import { productType } from '@/types/productType';
import { useState } from 'react';
import ProductOverlay from '../product/ProductOverlay';

type listProps = {
  cart: cartItemType[];
};

export default function List({ cart }: listProps) {
  const [selected, setSelected] = useState<productType | null>(null);

  return (
    <div className="flex flex-col divide-y-3 divide-primary rounded-md border-4">
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
