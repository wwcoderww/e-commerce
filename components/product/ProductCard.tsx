import { productType } from '@/types/productType';
import ProductDescription from './productCard/ProductDescription';
import ProductImage from './productCard/ProductImage';
import ProductRating from './productCard/ProductRating';
import ProductName from './productCard/ProductName';
import { inCart } from '@/state/slices/cartSlice';
import { useSelector } from 'react-redux';

type ProductCardProps = {
  product: productType;
  setSelected: (product: productType | null) => void;
};
export default function ProductCard({
  product,
  setSelected,
}: ProductCardProps) {
  const exist = useSelector(inCart(product.id));

  return (
    <div
      className={`flex w-90 cursor-pointer flex-col rounded-md border-6 bg-primary/40 text-xl text-black capitalize transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl ${exist ? 'border-green-600' : 'border-primary'}`}
      onClick={() => setSelected(product)}
    >
      <ProductImage image={product.image} />
      <ProductName name={product.name} />
      <ProductRating
        rating={product.rating}
        price={product.price}
        id={product.id}
      />
      <ProductDescription description={product.description} />
    </div>
  );
}
