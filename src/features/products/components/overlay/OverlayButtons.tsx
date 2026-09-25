import { ShoppingCartPlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { inCart, newItem } from '../../../state/cart/cartSlice';
import type { Product } from '../../../../types/Product';

type OverlayButtonsProps = {
  selected: Product;
};

export default function OverlayButtons({ selected }: OverlayButtonsProps) {
  const dispatch = useDispatch();
  const exist = useSelector(inCart(selected.id));

  return (
    <div className="flex items-center px-4 pt-12 text-center">
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
      <div>Remove</div>
    </div>
  );
}
