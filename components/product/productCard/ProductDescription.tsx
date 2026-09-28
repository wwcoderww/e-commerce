import type { productType } from '@/types/productType';

type ProductDescriptionProps = {
  description: productType['description'];
};

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  return (
    <div className="mb-4 h-[6lh] p-2 text-white/80">
      <div className="line-clamp-6">{description}</div>
    </div>
  );
}
