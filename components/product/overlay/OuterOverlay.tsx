import type { productType } from '@/types/productType';

type OuterOverlayProps = {
  setSelected: (product: productType | null) => void;
  children: React.ReactNode;
};

export default function OuterOverlay({
  setSelected,
  children,
}: OuterOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-8 backdrop-blur-sm"
      onClick={() => setSelected(null)}
    >
      {children}
    </div>
  );
}
