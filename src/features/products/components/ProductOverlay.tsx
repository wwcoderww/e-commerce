import type { Product } from '../../../types/Product';
import { SquareX } from 'lucide-react';

type ProductOverlayProps = {
  selected: Product;
  setSelected: (product: Product | null) => void;
};

export default function ProductOverlay({
  selected,
  setSelected,
}: ProductOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-8 backdrop-blur-sm"
      onClick={() => setSelected(null)}
    >
      <div
        className="relative flex h-11/12 w-11/12 rounded-2xl bg-black/60 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <SquareX
          className="absolute top-1 right-1 text-red-700 hover:cursor-pointer"
          size={62}
          onClick={() => setSelected(null)}
        />
        <div className="flex w-5/12 items-center justify-center rounded-2xl bg-gray-200">
          <img src={selected.image} className="max-h-full object-contain" />
        </div>
        <div className="flex w-7/12 flex-col gap-10 p-6 capitalize">
          <div className="border-b-2 border-solid border-primary text-center text-5xl font-extrabold">
            {selected.title}
          </div>
          <div className="flex flex-1 items-center overflow-scroll px-4 text-4xl">
            {selected.description}
          </div>
        </div>
      </div>
    </div>
  );
}
