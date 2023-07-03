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
               state.items.push({ ...action.payload, cartQuantity: 1 });
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
         if (
            Number(action.payload.quantity) === 0 ||
            action.payload.quantity === ""
         ) {
            state.items = state.items.map((item) => {
               if (item.id === action.payload.id) {
                  return { ...item, cartQuantity: +0 };
               } else {
                  return item;
               }
            });
         }
         if (
            typeof Number(action.payload.quantity) !== "number" ||
            isNaN(Number(action.payload.quantity))
         ) {
            console.log("not a number", action.payload.quantity);
         } else {
            state.items = state.items.map((item) => {
               console.log(item.id);
               if (item.id === action.payload.id) {
                  const newQuantity = action.payload.quantity;
                  console.log("newQuantity", newQuantity);
                  if (newQuantity < 0) {
                     state.status = {
                        ...state.status,
                        msg: "Invalid quantity",
                        isValid: false,
                     };
                     return item;
                  } else if (newQuantity > item.quantity) {
                     state.status = {
                        ...state.status,
                        msg: "You are trying to add exceeding current quantity",
                        isValid: false,
                     };
                     return item;
                  } else {
                     return { ...item, cartQuantity: newQuantity };
                  }
               } else {
                  return item;
               }
            });
         }
      },
      addToCartWithQuantity: (state, action) => {
         const game = action.payload;
         let count = 0;
         state.items = state.items.map((item) => {
            if (item.id === game.id) {
               count++;
               return { ...item, cartQuantity: game.cartQuantity + +item.cartQuantity };
            } else {
               return item;
            }
         });
         if (count === 0) {
            state.items.push(game);
         }
      },
      removeItems: (state, action) => {
         state.items = state.items.filter((item) => item.id !== action.payload);
      },
   },
});

export const cartSliceSelector = (state) => state.cartSlice;
