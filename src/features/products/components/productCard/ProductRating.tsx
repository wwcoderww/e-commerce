import { Star } from 'lucide-react';
import type { Product } from '../../../../types/Product';

type ProductRatingProps = {
  rating: Product['rating']['rate'];
  count: Product['rating']['count'];
  price: Product['price'];
};

export default function ProductRating({
  rating,
  count,
  price,
}: ProductRatingProps) {
  return (
    <div className="flex border-b-4 border-solid border-primary bg-primary/50 p-2 font-semibold">
      <div className="text-2xl">${price}</div>{' '}
      <div className="flex flex-1 items-center justify-end gap-1">
        <Star size={25} />
        <div>
          {rating} / {count}
        </div>
      </div>
    </div>
  );
}
