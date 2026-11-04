import { productType } from '@/types/productType';
import currency from '@/utils/currency';

type overlayPriceType = {
  selected: productType;
};

export default function OverlayPrice({ selected }: overlayPriceType) {
  return (
    <div className="flex justify-center pt-8 pb-2 text-4xl text-green-600 sm:hidden">
      {currency(selected.price)}
    </div>
  );
}
