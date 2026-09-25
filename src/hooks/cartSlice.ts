import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../types/cartItem';
import type { Product } from '../types/Product';

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};
// Helper Function
const findExistingItem = (cart: CartItem[], product: Product) =>
  cart.find((item) => item.id === product.id);
// Action Payload Type
type adjustQuantity = {
  item: Product;
  amount: number;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    newItem: (state, action: PayloadAction<Product>) => {
      state.items.push({ ...action.payload, quantity: 1 });
    },
    adjustQuantity: (state, action: PayloadAction<adjustQuantity>) => {
      const item = findExistingItem(state.items, action.payload.item);
      if (item) item.quantity = action.payload.amount;
    },
    addOne: (state, action: PayloadAction<Product>) => {
      const item = findExistingItem(state.items, action.payload);
      if (item) item.quantity += 1;
    },
    delOne: (state, action: PayloadAction<Product>) => {
      const item = findExistingItem(state.items, action.payload);
      if (item.quantity === 1) {
        state.items = state.items.filter((product) => product.id !== item.id);
      } else {
        item.quantity -= 1;
      }
    },
    deleteItem: (state, action: PayloadAction<Product>) => {
      const item = findExistingItem(state.items, action.payload);
      state.items = state.items.filter((product) => product.id !== item.id);
    },
  },
});

export default cartSlice.reducer;
export const { newItem, adjustQuantity, addOne, delOne, deleteItem } =
  cartSlice.actions;
