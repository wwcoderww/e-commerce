import type { Product } from '@/types/Product';
import Image from 'next/image';
type OverlayImageProps = {
  selected: Product;
};

export default function OverlayImage({ selected }: OverlayImageProps) {
  return (
    <div className="relative mr-4 flex w-5/12 items-center justify-center rounded-2xl bg-gray-200">
      <Image
        src={selected.image}
        className="max-h-full object-contain"
        alt="Product Image"
        fill
      />
    </div>
  );
}
