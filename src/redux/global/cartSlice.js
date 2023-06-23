import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export default createSlice({
   name: "cartSlice",
   initialState: {
      items: [],
      status: {
         msg: "",
         isValid: false,
      },
   },
   reducers: {
      addToCart: (state, action) => {
         const item = state.items.find((item) => item.id === action.payload.id);
         if (!item) {
            if (action.payload.quantity > 0) {
               state.items.push(action.payload);
               state.status = {
                  ...state.status,
                  msg: "Add to cart successfully!",
                  isValid: true,
               };
            } else {
               state.status = {
                  ...state.status,
                  msg: "The game is not available!",
                  isValid: false,
               };
            }
         } else {
            state.status = {
               ...state.status,
               msg: "Game already in your cart!",
               isValid: true,
            };
         }
      },
      changeQuantity: (state, action) => {
         state.status = {
            ...state.status,
            msg: "You already have a game in your cart!",
            isValid: true,
         };
      },
   },
});

export const cartSliceSelector = (state) => state.cartSlice;
