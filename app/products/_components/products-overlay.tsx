import InnerOverlay from './overlay/products-overlay-inner';
import OuterOverlay from './overlay/products-overlay-outer';
import OverlayButtons from './overlay/products-overlay-buttons';
import OverlayDescription from './overlay/products-overlay-description';
import OverlayImage from './overlay/products-overlay-image';
import OverlayName from './overlay/products-overlay-name';
import { productType } from '@/types/productType';

type ProductOverlayProps = {
  selected: productType;
  setSelected: (product: productType | null) => void;
};

export default function ProductOverlay({
  selected,
  setSelected,
}: ProductOverlayProps) {
  return (
    <OuterOverlay setSelected={setSelected}>
      <InnerOverlay setSelected={setSelected}>
        <OverlayImage selected={selected} />
        <div className="flex w-full flex-col border-solid border-primary p-6 capitalize lg:w-7/12 lg:border-l-3">
          <OverlayName selected={selected} />
          <OverlayButtons selected={selected} />
          <OverlayDescription selected={selected} />
        </div>
      </InnerOverlay>
    </OuterOverlay>
  );
}
