import { cartItemType } from '@/types/cartItemType';
import Buttons from './list/Buttons';
import Description from './list/Description';
import Picture from './list/Picture';

type listProps = {
  cart: cartItemType[];
};

export default function List({ cart }: listProps) {
  return (
    <div className="flex flex-col divide-y-3 rounded-md border-4">
      {cart?.map((item) => (
        <div key={item.id} className="flex bg-gray-600 capitalize">
          <Picture item={item} />
          <Description item={item} />
          <Buttons item={item} />
        </div>
      ))}
    </div>
  );
}
