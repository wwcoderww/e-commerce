import type { cartItemType } from '@/types/cartItemType';
import type { productType } from '@/types/productType';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
// InitalState type
type CartState = {
  items: cartItemType[];
};
// Action Payload Type
type adjustQuantity = {
  item: productType;
  amount: number;
};
// Helper Function
const findExistingItem = (cart: cartItemType[], product: productType) =>
  cart.find((item) => item.id === product.id);

// InitalState
const initialState: CartState = {
  items: [],
};
// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add new item
    newItem: (state, action: PayloadAction<productType>) => {
      const item = findExistingItem(state.items, action.payload);
      if (item) return;
      state.items.push({ ...action.payload, quantity: 1 });
    },
    // Change quantity to X
    adjustQuantity: (state, action: PayloadAction<adjustQuantity>) => {
      const item = findExistingItem(state.items, action.payload.item);
      if (item) item.quantity = action.payload.amount;
    },
    // Add one to quantity
    addOne: (state, action: PayloadAction<productType>) => {
      const item = findExistingItem(state.items, action.payload);
      if (item) item.quantity += 1;
    },
    // Delete one from quantity
    delOne: (state, action: PayloadAction<productType>) => {
      const item = findExistingItem(state.items, action.payload);
      if (!item) return;
      if (item.quantity === 1) {
        state.items = state.items.filter((product) => product.id !== item.id);
      } else {
        item.quantity -= 1;
      }
    },
    // Delete item
    deleteItem: (state, action: PayloadAction<productType>) => {
      const item = findExistingItem(state.items, action.payload);
      if (!item) return;
      state.items = state.items.filter((product) => product.id !== item.id);
    },
  },
});

// --- SELECTORS ---
// Check if item is in cart
function inCart(productID: number | string) {
  return (state: RootState) => {
    return state.cart.items.some((item) => item.id === productID);
  };
}
// Return cart size
function cartSize() {
  return (state: RootState) => {
    return state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
  };
}
// Return all items containing X in title
function cartSearch(name: string) {
  return (state: RootState) => {
    return state.cart.items.filter((item) =>
      item.title.toLowerCase().includes(name.toLowerCase()),
    );
  };
}
// Return Cart
function listCart() {
  return (state: RootState) => {
    return state.cart.items;
  };
}
// Return total cart items
function returnQuantity(id: number | string) {
  return (state: RootState) => {
    return state.cart.items.find((item) => item.id === id)?.quantity;
  };
}
function cartTotal() {
  return (state: RootState) => {
    return state.cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );
  };
}

// Exports
export default cartSlice.reducer;
export const { newItem, adjustQuantity, addOne, delOne, deleteItem } =
  cartSlice.actions;
export { cartSearch, cartSize, inCart, listCart, returnQuantity, cartTotal };
