import type { Product } from '../../../types/Product';
import ProductDescription from './ProductDescription';
import ProductImage from './ProductImage';
import ProductRating from './ProductRating';
import ProductTitle from './ProductTitle';
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex w-90 flex-col rounded-md border-6 border-primary bg-primary/40 text-xl text-black capitalize">
      <ProductImage image={product.image} />
      <ProductTitle title={product.title} />
      <ProductRating
        rating={product.rating.rate}
        count={product.rating.count}
        price={product.price}
      />
      <ProductDescription description={product.description} />
    </div>
  );
}
