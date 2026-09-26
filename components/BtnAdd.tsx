import { addOne } from '@/state/slices/cartSlice';
import { Product } from '@/types/Product';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';

type BtnAddProps = {
  item: Product;
};

export default function BtnAdd({ item }: BtnAddProps) {
  const dispatch = useDispatch();
  return (
    <Plus
      className="text-green-600 transition duration-100 ease-in-out hover:-translate-y-0.5 hover:cursor-pointer"
      size={36}
      onClick={() => dispatch(addOne(item))}
    />
  );
}
