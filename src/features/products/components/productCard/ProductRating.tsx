import { Star } from 'lucide-react';
import type { Product } from '../../../../types/Product';
import { useSelector } from 'react-redux';
import { inCart } from '../../../state/cart/cartSlice';
import currency from '../../../../utils/currency';

type ProductRatingProps = {
  rating: Product['rating']['rate'];
  count: Product['rating']['count'];
  id: Product['id'];
  price: Product['price'];
};

export default function ProductRating({
  rating,
  count,
  price,
  id,
}: ProductRatingProps) {
  const [exist] = useSelector(inCart(id));

  return (
    <div className="flex border-b-4 border-solid border-primary bg-primary/50 p-2 font-semibold">
      <div className={`text-2xl ${exist && 'text-green-600'}`}>
        {currency(price)}
      </div>{' '}
      <div className="flex flex-1 items-center justify-end gap-1">
        <Star size={25} />
        <div>
          {rating.toFixed(1)} / {count}
        </div>
      </div>
    </div>
  );
}
