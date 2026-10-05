import ImageLoader from '@/components/ImageLoader';
import { productType } from '@/types/productType';

type pictureProps = {
  item: productType;
};

export default function Picture({ item }: pictureProps) {
  return (
    <div className="bg-gray-400 p-2">
      <div className="relative h-40 w-40">
        <ImageLoader src={item.image} alt="Item Image" />
      </div>
    </div>
  );
}
