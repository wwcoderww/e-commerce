import { deleteItem } from '@/state/slices/cartSlice';
import { productType } from '@/types/productType';
import { Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';

type BtnTrashProps = {
  item: productType;
  size?: number;
};

export default function BtnTrash({ item, size = 36 }: BtnTrashProps) {
  const dispatch = useDispatch();
  return (
    <Trash
      onClick={() => dispatch(deleteItem(item))}
      className="text-red-600 transition duration-100 ease-in-out hover:-translate-y-0.5 hover:cursor-pointer"
      size={size}
    />
  );
}
