import type { productType } from '@/types/productType';
type OverlayDescriptionProps = {
  selected: productType;
};

export default function OverlayDescription({
  selected,
}: OverlayDescriptionProps) {
  return (
    <div className="flex flex-1 overflow-y-scroll text-4xl md:px-4">
      {selected.description}
    </div>
  );
}
