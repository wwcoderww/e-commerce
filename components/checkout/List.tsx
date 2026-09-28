import { cartItemType } from '@/types/cartItemType';
import Image from 'next/image';
import Buttons from './list/Buttons';
import Description from './list/Description';
import Picture from './list/Picture';

type listProps = {
  cart: cartItemType[];
};

export default function List({ cart }: listProps) {
  return (
    <div className="m-auto flex max-w-7/12 flex-col divide-y-3 rounded-md border-4 bg-gray-600">
      {cart?.map((item) => (
        <div key={item.id} className="flex capitalize">
          <Picture item={item} />
          <Description item={item} />
          <Buttons item={item} />
        </div>
      ))}
    </div>
  );
}
