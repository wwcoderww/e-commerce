import type { productType } from '../../types/productType';
import InnerOverlay from './overlay/InnerOverlay';
import OuterOverlay from './overlay/OuterOverlay';
import OverlayButtons from './overlay/OverlayButtons';
import OverlayDescription from './overlay/OverlayDescription';
import OverlayImage from './overlay/OverlayImage';
import OverlayName from './overlay/OverlayName';

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
