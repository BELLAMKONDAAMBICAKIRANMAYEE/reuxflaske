// store/Slices/CartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: []
};

const CartSlice = createSlice({

  name: "Cart",

  initialState,

  reducers: {

    // Add Item

    addToCart: (state, action) => {

      state.cartItems.push(action.payload);

    },

    // Remove Item

    removeFromCart: (state, action) => {

      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );

    },

    // Clear Cart

    clearCart: (state) => {

      state.cartItems = [];

    }

  }

});

// Export Actions

export const {
  addToCart,
  removeFromCart,
  clearCart
} = CartSlice.actions;

// Export Reducer

export default CartSlice.reducer;