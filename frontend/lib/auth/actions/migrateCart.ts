import { cartApi } from '@/state/api/cartApi';
import { productApi } from '@/state/api/productApi';
import { hydrateCart, listCart, setUserId } from '@/state/slices/cartSlice';
import { store } from '@/state/store';
import { cartItemType } from '@/types/cartItemType';

export default async function migrateCart(userId: string) {
  const localCart = listCart()(store.getState());
  const [serverCart, products] = await Promise.all([
    store.dispatch(cartApi.endpoints.getCartById.initiate(userId)).unwrap(),
    store.dispatch(productApi.endpoints.getProducts.initiate()).unwrap(),
  ]);

  const merged = [...serverCart, ...localCart].reduce<
    Record<string, cartItemType>
  >((acc, item) => {
    const prodId = 'productId' in item ? item.productId : item.id;
    const base = 'name' in item ? item : products.find((p) => p.id === prodId);
    if (!base) return acc;

    acc[prodId] = {
      ...base,
      quantity: item.quantity,
    };
    return acc;
  }, {});

  const mergedCart = Object.values(merged);

  if (localCart.length > 0) {
    await store
      .dispatch(
        cartApi.endpoints.syncCart.initiate({
          userId,
          cart: mergedCart,
        }),
      )
      .unwrap();
  }

  store.dispatch(hydrateCart(mergedCart));
  store.dispatch(setUserId(userId));
  localStorage.setItem('cart', JSON.stringify(mergedCart));
}
