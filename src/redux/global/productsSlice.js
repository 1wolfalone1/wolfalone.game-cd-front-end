import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { number } from "yup";
import { apid } from "../../api/API";

export const getGameStatus = {
   PENDING: 0,
   REJECTED: -1,
   FULFILLED: 1
}

const productSlice = createSlice({
   name: "productsSlice",
   initialState: {
      status: "loading",
      filter: {
         category: "",
         price: {
            from: 0,
            to: Number.MAX_VALUE,
         },
      },
      page: 0,
      products: {
         totalPage: 0,
         totalProduct: 0,
         games: [],
         currentPage: 0,
      },
   },
   reducers: {
      changeAuthentication: (state, action) => {
         state.status = action.payload.status;
         state.info = action.payload.info;
      },
   },
   extraReducers: (builder) =>
   builder.addCase(getGameAndPaging.fulfilled, (state, action) => {

      state.status = getGameStatus.FULFILLED;
      state.products = action.payload;
   })
   .addCase(getGameAndPaging.pending, (state, action) => {
      state.status = getGameStatus.PENDING
   })
   .addCase(getGameAndPaging.rejected, (state, action) => {
      state.status = getGameStatus.REJECTED
   })
});
export default productSlice;
export const getGameAndPaging = createAsyncThunk(
   "game/getGameAndPaging",
   async (page) => {
      try {
         const response = await apid.get(`games/${page}`);
         const data = await response.data;
         data.currentPage = page;
         return data;
      } catch (e) {
         console.error(e);
      }
   }
);



export const gamesPagingSelector = state => state.productSlice.products;
export const statusGame = state => state.productSlice.status;
export const pageSelector = state =>state.productSlice.products.page;