import { Minus, Plus, ShoppingCartPlus, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addOne,
  delOne,
  deleteItem,
  inCart,
  newItem,
  returnQuantity,
} from '@/state/slices/cartSlice';
import type { productType } from '@/types/productType';
import BtnDel from '@/components/BtnDel';
import BtnAdd from '@/components/BtnAdd';
import BtnTrash from '@/components/BtnTrash';

type OverlayButtonsProps = {
  selected: productType;
};

export default function OverlayButtons({ selected }: OverlayButtonsProps) {
  const dispatch = useDispatch();
  const exist = useSelector(inCart(selected.id));
  const quantity = useSelector(returnQuantity(selected.id));

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
        <div className="flex w-full items-center justify-between gap-4 px-4 text-4xl">
          <div className="flex items-center gap-4 rounded-lg border-3 border-solid p-1">
            <BtnAdd item={selected} />
            <div className="font-extrabold">{quantity}</div>
            <BtnDel item={selected} />
          </div>
          <BtnTrash item={selected} />
        </div>
      )}
    </div>
  );
}
