import type { Product } from '../../../../types/Product';
type OverlayTitleProps = {
  selected: Product;
};

export default function OverlayTitle({ selected }: OverlayTitleProps) {
  return (
    <div className="border-b-2 border-solid border-primary text-center text-5xl font-extrabold">
      {selected.title}
    </div>
  );
}
