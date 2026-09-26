import { delOne } from '@/state/slices/cartSlice';
import { Product } from '@/types/Product';
import { Minus } from 'lucide-react';
import { useDispatch } from 'react-redux';

type BtnDelProps = {
  item: Product;
};

export default function BtnDel({ item }: BtnDelProps) {
  const dispatch = useDispatch();
  return (
    <Minus
      className="text-green-600 transition duration-100 ease-in-out hover:-translate-y-0.5 hover:cursor-pointer"
      size={36}
      onClick={() => dispatch(delOne(item))}
    />
  );
}
