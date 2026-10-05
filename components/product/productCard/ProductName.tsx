import type { productType } from '@/types/productType';

type ProductNameProps = {
  name: productType['name'];
};

export default function ProductName({ name }: ProductNameProps) {
  return (
    <div className="flex items-center justify-center border-t-4 border-solid border-primary bg-primary/50 px-1 py-2 text-center font-extrabold">
      <div className="line-clamp-2">{name}</div>
    </div>
  );
}
