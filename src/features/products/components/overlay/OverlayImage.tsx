import type { Product } from '../../../../types/Product';
type OverlayImageProps = {
  selected: Product;
};

export default function OverlayImage({ selected }: OverlayImageProps) {
  return (
    <div className="mr-4 flex w-5/12 items-center justify-center rounded-2xl bg-gray-200">
      <img src={selected.image} className="max-h-full object-contain" />
    </div>
  );
}
