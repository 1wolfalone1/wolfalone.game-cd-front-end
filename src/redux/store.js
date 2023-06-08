
import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./global/userInfoSlice";
import layoutSlice from "../container/common/layout/layoutSlice";
import productSlice from "./global/productsSlice";


const store = configureStore({
   reducer: {
      userInfo: userInfoSlice.reducer,
      layout: layoutSlice.reducer,
      productSlice: productSlice.reducer
   }
})

export default store;