import { Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { inCart } from '@/state/slices/cartSlice';
import currency from '@/utils/currency';
import { productType } from '@/types/productType';

type ProductRatingProps = {
  rating: productType['rating'];
  id: productType['id'];
  price: productType['price'];
};

export default function ProductRating({
  rating,
  price,
  id,
}: ProductRatingProps) {
  const displayRating = rating ?? 5;

  return (
    <div className="flex border-b-4 border-solid border-primary bg-primary/50 p-2 font-semibold">
      <div className={`text-2xl`}>{currency(price)}</div>{' '}
      <div className="flex flex-1 items-center justify-end gap-1">
        <Star size={25} />
        <div>{displayRating.toFixed(1)}</div>
      </div>
    </div>
  );
}
