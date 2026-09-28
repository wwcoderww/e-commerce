import type { productType } from './productType';

export type cartItemType = productType & { quantity: number };
