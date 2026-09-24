import type { Product } from '../../../types/Product';
import { Star } from 'lucide-react';
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex w-90 flex-col rounded-md border-6 border-primary bg-primary/30 text-xl text-black capitalize">
      <div className="h-82 bg-gray-300">
        <img src={product.image} alt={product.title} className="mx-auto h-80" />
      </div>
      <div className="flex items-center justify-center border-t-4 border-solid border-primary bg-primary/40 px-1 py-2 text-center font-semibold">
        <div className="line-clamp-2">{product.title}</div>
      </div>
      <div className="flex border-b-4 border-solid border-primary bg-primary/40 p-2 font-semibold">
        <div className="text-2xl">${product.price}</div>{' '}
        <div className="flex flex-1 items-center justify-end gap-1">
          <Star size={25} />
          <div>
            {product.rating.rate} / {product.rating.count}
          </div>
        </div>
      </div>
      <div className="mb-4 h-[6lh] p-2">
        <div className="line-clamp-6">{product.description}</div>
      </div>
    </div>
  );
}
