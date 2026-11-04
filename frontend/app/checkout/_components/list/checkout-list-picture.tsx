import ImageLoader from '@/components/imageLoader';
import { productType } from '@/types/productType';

type pictureProps = {
  item: productType;
};

export default function Picture({ item }: pictureProps) {
  return (
    <div className="bg-gray-400 p-2">
      <div className="h-50 w-50 md:h-40 md:w-40">
        <ImageLoader src={item.image} alt="Item Image" />
      </div>
    </div>
  );
}
