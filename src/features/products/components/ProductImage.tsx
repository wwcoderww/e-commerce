import type { Product } from '../../../types/Product';

type ProductImageProps = {
  image: Product['image'];
};

export default function ProductImage({ image }: ProductImageProps) {
  return (
    <div className="h-82 bg-gray-200">
      <img src={image} alt={'Image'} className="mx-auto h-80" />
    </div>
  );
}
