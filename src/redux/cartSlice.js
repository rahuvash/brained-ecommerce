import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productExists = state.cart.find((item) => item.id === action.payload.id);

      if (productExists) {
       
        productExists.quantity += action.payload.quantity;
      } else {
        
        state.cart.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    updateCartItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
        state.cart = []; 
      },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
