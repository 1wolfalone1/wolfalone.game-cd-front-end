
import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./global/userInfoSlice";
import layoutSlice from "../container/common/layout/layoutSlice";


const store = configureStore({
   reducer: {
      userInfo: userInfoSlice.reducer,
      layout: layoutSlice.reducer
   }
})

export default store;