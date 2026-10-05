import type { productType } from '@/types/productType';
type OverlayNameProps = {
  selected: productType;
};

export default function OverlayName({ selected }: OverlayNameProps) {
  return (
    <div className="border-b-2 border-solid border-primary text-center text-5xl font-extrabold">
      {selected.name}
    </div>
  );
}
