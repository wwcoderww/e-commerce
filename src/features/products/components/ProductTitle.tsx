import type { Product } from '../../../types/Product';

type ProductTitleProps = {
  title: Product['title'];
};

export default function ProductTitle({ title }: ProductTitleProps) {
  return (
    <div className="flex items-center justify-center border-t-4 border-solid border-primary bg-primary/50 px-1 py-2 text-center font-semibold">
      <div className="line-clamp-2">{title}</div>
    </div>
  );
}
