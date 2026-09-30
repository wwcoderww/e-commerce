import { clearCart } from '@/state/slices/cartSlice';
import { useDispatch } from 'react-redux';
import Button from '../Button';

export default function CheckoutButton() {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-end pt-16">
      <Button
        customClass="text-xl"
        onClick={() => dispatch(clearCart())}
        name="Clear Cart"
      />
    </div>
  );
}
