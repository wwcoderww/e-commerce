import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { cartSize } from '../../state/cart/cartSlice';

export default function Cart() {
  const total = useSelector(cartSize());
  return (
    <div className="flex cursor-pointer items-center gap-1 pr-4">
      {total > 0 && <div className="mb-1 text-4xl">({total})</div>}
      <ShoppingCart size={40} />
    </div>
  );
}
