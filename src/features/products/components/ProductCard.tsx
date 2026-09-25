import type { Product } from '../../../types/Product';
import ProductDescription from './productCard/ProductDescription';
import ProductImage from './productCard/ProductImage';
import ProductRating from './productCard/ProductRating';
import ProductTitle from './productCard/ProductTitle';

type ProductCardProps = {
  product: Product;
  setSelected: (product: Product | null) => void;
};
export default function ProductCard({
  product,
  setSelected,
}: ProductCardProps) {
  return (
    <div
      className="flex w-90 cursor-pointer flex-col rounded-md border-6 border-primary bg-primary/40 text-xl text-black capitalize transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
      onClick={() => setSelected(product)}
    >
      <ProductImage image={product.image} />
      <ProductTitle title={product.title} />
      <ProductRating
        rating={product.rating.rate}
        count={product.rating.count}
        price={product.price}
        id={product.id}
      />
      <ProductDescription description={product.description} />
    </div>
  );
}
