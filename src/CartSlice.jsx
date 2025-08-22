import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0, // Add a new state property to track the total quantity
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalQuantity++;
    },
    removeItem: (state, action) => {
      const nameToRemove = action.payload;
      const existingItem = state.items.find(item => item.name === nameToRemove);
      
      if (existingItem) {
        state.items = state.items.filter(item => item.name !== nameToRemove);
        state.totalQuantity -= existingItem.quantity;
      }
    },
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        const previousQuantity = existingItem.quantity;
        existingItem.quantity = amount;
        state.totalQuantity += (amount - previousQuantity);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;