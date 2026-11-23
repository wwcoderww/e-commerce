import InnerOverlay from './overlay/overlay-inner';
import OuterOverlay from './overlay/overlay-outer';
import OverlayButtons from './overlay/buttons';
import OverlayDescription from './overlay/description';
import OverlayImage from './overlay/image';
import OverlayName from './overlay/overlay-name';
import { productType } from '@/types/productType';
import OverlayPrice from './overlay/overlay-price';

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
          <OverlayPrice selected={selected} />
          <OverlayButtons selected={selected} />
          <OverlayDescription selected={selected} />
        </div>
      </InnerOverlay>
    </OuterOverlay>
  );
}
