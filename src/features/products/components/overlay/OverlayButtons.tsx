import { Minus, Plus, ShoppingCartPlus, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addOne,
  delOne,
  deleteItem,
  inCart,
  newItem,
} from '../../../state/cart/cartSlice';
import type { Product } from '../../../../types/Product';

type OverlayButtonsProps = {
  selected: Product;
};

export default function OverlayButtons({ selected }: OverlayButtonsProps) {
  const dispatch = useDispatch();
  const [exist] = useSelector(inCart(selected.id));

  return (
    <div className="flex items-center px-4 py-10 text-center">
      {!exist && (
        <div
          className="flex w-full justify-center text-green-600 transition duration-100 ease-in-out hover:-translate-y-1 hover:cursor-pointer"
          onClick={() => {
            dispatch(newItem(selected));
          }}
        >
          <ShoppingCartPlus className="" size={36} />
          <div className="px-2 text-4xl font-bold underline">Add to Cart</div>
        </div>
      )}
      {exist && (
        <div className="flex w-full items-center gap-4 px-4 text-4xl">
          <div className="flex items-center gap-4 rounded-lg border-3 border-solid p-1">
            <Plus
              className="text-green-600 transition duration-100 ease-in-out hover:-translate-y-0.5 hover:cursor-pointer"
              size={36}
              onClick={() => dispatch(addOne(selected))}
            />
            <div className="font-extrabold">{exist.quantity}</div>
            <Minus
              className="text-red-600 transition duration-100 ease-in-out hover:-translate-y-0.5 hover:cursor-pointer"
              size={36}
              onClick={() => dispatch(delOne(selected))}
            />
          </div>
          <Trash
            onClick={() => dispatch(deleteItem(selected))}
            className="ml-auto text-red-600 transition duration-100 ease-in-out hover:-translate-y-0.5 hover:cursor-pointer"
            size={36}
          />
        </div>
      )}
    </div>
  );
}
