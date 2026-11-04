import Button from '@/components/button';
import { clearCart } from '@/state/slices/cartSlice';
import { useDispatch } from 'react-redux';

export default function ClearCart() {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center pt-16 sm:justify-end">
      <Button
        customClass="text-xl"
        onClick={() => dispatch(clearCart())}
        name="Clear Cart"
      />
    </div>
  );
}
