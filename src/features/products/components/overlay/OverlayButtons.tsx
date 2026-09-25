import { Minus, Plus, ShoppingCartPlus, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, inCart, newItem } from '../../../state/cart/cartSlice';
import type { Product } from '../../../../types/Product';

type OverlayButtonsProps = {
  selected: Product;
};

export default function OverlayButtons({ selected }: OverlayButtonsProps) {
  const dispatch = useDispatch();
  const exist = useSelector(inCart(selected.id));

  return (
    <div className="flex items-center px-4 py-6 text-center">
      {!exist && (
        <div
          className="flex text-green-600 hover:cursor-pointer"
          onClick={() => {
            dispatch(newItem(selected));
          }}
        >
          <ShoppingCartPlus className="" size={36} />
          <div className="px-2 text-3xl font-bold underline">Add to Cart</div>
        </div>
      )}
      {exist && (
        <div className="flex w-full items-center gap-4 text-4xl">
          <Plus className="text-green-600 hover:cursor-pointer" size={36} />
          <div className="font-extrabold">0</div>
          <Minus className="text-red-600 hover:cursor-pointer" size={36} />
          <Trash
            onClick={() => dispatch(deleteItem(selected))}
            className="ml-auto text-red-600 hover:cursor-pointer"
            size={36}
          />
        </div>
      )}
    </div>
  );
}
