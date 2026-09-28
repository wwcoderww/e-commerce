import type { productType } from '@/types/productType';
type OverlayDescriptionProps = {
  selected: productType;
};

export default function OverlayDescription({
  selected,
}: OverlayDescriptionProps) {
  return (
    <div className="flex flex-1 overflow-scroll px-4 text-4xl">
      {selected.description}
    </div>
  );
}
