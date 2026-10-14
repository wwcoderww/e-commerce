import ImageLoader from '@/components/ImageLoader';
import type { productType } from '@/types/productType';
import Image from 'next/image';
type OverlayImageProps = {
  selected: productType;
};

export default function OverlayImage({ selected }: OverlayImageProps) {
  return (
    <div className="relative mt-12 flex h-9/12 w-full shrink-0 items-center justify-center rounded-2xl bg-gray-200 lg:mt-0 lg:mr-4 lg:h-full lg:w-5/12">
      <ImageLoader
        src={selected.image}
        customClass="max-h-full object-contain"
        alt="Product Image"
      />
    </div>
  );
}
