import { cartItemType } from '@/types/cartItemType';
import { productType } from '@/types/productType';

export default function filterList(
  list: productType[] | cartItemType[],
  filter: 'az',
) {
  if (filter === 'az')
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
}
