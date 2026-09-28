import { clearCart } from '@/state/slices/cartSlice';
import { useDispatch } from 'react-redux';

export default function CheckoutButton() {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-end p-4 pt-16 pb-24">
      <button
        className="rounded-lg border-2 border-solid border-primary bg-primary/40 p-1 text-xl text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:cursor-pointer"
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </button>
    </div>
  );
}
