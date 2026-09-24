import type { Product } from '../../../types/Product';

type ProductImageProps = {
  image: Product['image'];
};

export default function ProductImage({ image }: ProductImageProps) {
  return (
    <div className="h-82 overflow-hidden bg-gray-200">
      <img
        src={image}
        alt={'Image'}
        className="mx-auto h-80 object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}
