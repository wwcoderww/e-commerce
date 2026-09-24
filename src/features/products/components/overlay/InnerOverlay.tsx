import { SquareX } from 'lucide-react';
import type { Product } from '../../../../types/Product';

type InnerOverlayProps = {
  setSelected: (product: Product | null) => void;
  children: React.ReactNode;
};

export default function InnerOverlay({
  setSelected,
  children,
}: InnerOverlayProps) {
  return (
    <div
      className="relative flex h-11/12 w-11/12 rounded-2xl bg-black/60 p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <SquareX
        className="absolute top-1 right-1 text-red-700 hover:cursor-pointer"
        size={62}
        onClick={() => setSelected(null)}
      />
      {children}
    </div>
  );
}
