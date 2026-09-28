import Image from 'next/image';
import { productType } from '@/types/productType';

type pictureProps = {
  item: productType;
};

export default function Picture({ item }: pictureProps) {
  return (
    <div className="p-2">
      <div className="relative h-40 w-40">
        <Image src={item.image} alt="Item Image" fill />
      </div>
    </div>
  );
}
