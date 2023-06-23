import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./global/userInfoSlice";
import layoutSlice from "../container/common/layout/layoutSlice";
import productSlice from "./global/productsSlice";
import globalSlice from "./global/globalSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import cartSlice from "./global/cartSlice";
const persistConfig = {
   key: "root",
   version: 1,
   storage,
   // if you do not want to persist this part of the state
   blacklist: ['productSlice', 'layout', 'globalSlice'],
};
const reducer = combineReducers({
   userInfo: userInfoSlice.reducer,
   layout: layoutSlice.reducer,
   productSlice: productSlice.reducer,
   globalSlice: globalSlice.reducer,
   cartSlice: cartSlice.reducer
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
