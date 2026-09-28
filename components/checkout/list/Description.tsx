import { productType } from '@/types/productType';

type descriptionProps = {
  item: productType;
};

export default function Description({ item }: descriptionProps) {
  return (
    <div className="border-r-2 border-l-2 px-3">
      <div className="mx-auto line-clamp-1 max-w-160 border-b-2 py-2 text-center text-3xl font-bold">
        {item.title}
      </div>
      <div className="flex py-1 text-2xl">
        <div className="max-w-240 pr-2 text-xl font-light">
          {item.description}
        </div>
      </div>
    </div>
  );
}
