import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Load cart from MongoDB
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },

    // Add item
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    // Remove item
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },

    // Increase quantity
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    // Decrease quantity
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;