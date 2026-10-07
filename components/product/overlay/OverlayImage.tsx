import ImageLoader from '@/components/ImageLoader';
import type { productType } from '@/types/productType';
import Image from 'next/image';
type OverlayImageProps = {
  selected: productType;
};

export default function OverlayImage({ selected }: OverlayImageProps) {
  return (
    <div className="relative mr-4 flex w-5/12 items-center justify-center rounded-2xl bg-gray-200">
      <ImageLoader
        src={selected.image}
        customClass="max-h-full object-contain"
        alt="Product Image"
      />
    </div>
  );
}
