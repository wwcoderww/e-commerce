import { listCart } from '@/state/slices/cartSlice';
import { useSelector } from 'react-redux';

export function useMergeCart() {
  const localStorageCart = useSelector(listCart);
  const dataBaseCart = await;
}
