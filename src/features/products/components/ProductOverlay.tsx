import type { Product } from '../../../types/Product';
import InnerOverlay from './overlay/InnerOverlay';
import OuterOverlay from './overlay/OuterOverlay';
import OverlayButtons from './overlay/OverlayButtons';
import OverlayDescription from './overlay/OverlayDescription';
import OverlayImage from './overlay/OverlayImage';
import OverlayTitle from './overlay/OverlayTitle';

type ProductOverlayProps = {
  selected: Product;
  setSelected: (product: Product | null) => void;
};

export default function ProductOverlay({
  selected,
  setSelected,
}: ProductOverlayProps) {
  return (
    <OuterOverlay setSelected={setSelected}>
      <InnerOverlay setSelected={setSelected}>
        <OverlayImage selected={selected} />
        <div className="flex w-7/12 flex-col border-l-3 border-solid border-primary p-6 capitalize">
          <OverlayTitle selected={selected} />
          <OverlayButtons selected={selected} />
          <OverlayDescription selected={selected} />
        </div>
      </InnerOverlay>
    </OuterOverlay>
  );
}
