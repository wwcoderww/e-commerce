import type { Product } from '../../../../types/Product';
type OverlayDescriptionProps = {
  selected: Product;
};

export default function OverlayDescription({
  selected,
}: OverlayDescriptionProps) {
  return (
    <div className="flex flex-1 items-center overflow-scroll px-4 text-4xl">
      {selected.description}
    </div>
  );
}
