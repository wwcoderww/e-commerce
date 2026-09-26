import type { Product } from '@/types/Product';
import Image from 'next/image';

type ProductImageProps = {
  image: Product['image'];
};

export default function ProductImage({ image }: ProductImageProps) {
  return (
    <div className="relative h-82 overflow-hidden bg-gray-200">
      <Image
        src={image}
        alt={'Product Image'}
        className="mx-auto h-80 object-contain transition-transform duration-300 group-hover:scale-105"
        fill
      />
    </div>
  );
}
