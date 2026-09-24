import { ShoppingCartPlus } from 'lucide-react';

export default function OverlayButtons() {
  return (
    <div className="flex items-center px-4 pt-12 text-center">
      <div className="flex text-green-600 hover:cursor-pointer">
        <ShoppingCartPlus className="" size={36} />
        <div className="px-2 text-3xl font-bold underline">Add to Cart</div>
      </div>
      <div>Remove</div>
    </div>
  );
}
