import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { number } from "yup";
import { apid } from "../../api/API";
import globalSlice from "./globalSlice";

export const getGameStatus = {
   PENDING: 0,
   REJECTED: -1,
   FULFILLED: 1,
};
const initialState = {
   status: "loading",
   filter: {
      name: "",
      category: 0,
      price: {
         from: 0,
         to: null,
      },
   },
   page: 0,
   products: {
      totalPage: 0,
      totalProduct: 0,
      games: [],
      currentPage: 0,
   },
};
const productSlice = createSlice({
   name: "productsSlice",
   initialState,
   reducers: {
      changeAuthentication: (state, action) => {
         state.status = action.payload.status;
         state.info = action.payload.info;
      },
      changeSearchValue: (state, action) => {
         state.filter.name = action.payload;
      },
      changeFromPriceValue: (state, action) => {
         state.filter.price.from = action.payload;
      },
      changeToPriceValue: (state, action) => {
         state.filter.price.to = action.payload;
      },
      changeCategotyID: (state, action) => {
         state.filter.category = action.payload;
      },
      resetFilter: (state, action) => {
         state.filter = initialState.filter;
      },
   },
   extraReducers: (builder) =>
      builder
         .addCase(getGameAndPaging.fulfilled, (state, action) => {
            state.status = getGameStatus.FULFILLED;
            state.products = action.payload;
         })
         .addCase(getGameAndPaging.pending, (state, action) => {
            state.status = getGameStatus.PENDING;
         })
         .addCase(getGameAndPaging.rejected, (state, action) => {
            state.status = getGameStatus.REJECTED;
         })
         .addCase(getGameAndFilterAndPaging.fulfilled, (state, action) => {
            state.status = getGameStatus.FULFILLED;
            state.products = action.payload;
         })
         .addCase(getGameAndFilterAndPaging.pending, (state, action) => {
            state.status = getGameStatus.PENDING;
         })
         .addCase(getGameAndFilterAndPaging.rejected, (state, action) => {
            state.status = getGameStatus.REJECTED;
         }),
});
export default productSlice;
export const getGameAndPaging = createAsyncThunk(
   "game/getGameAndPaging",
   async (page, { dispatch }) => {
      dispatch(globalSlice.actions.changeBackdrop(true));
      try {
         const response = await apid.get(`games/${page}`);
         const data = await response.data;
         data.currentPage = page;
         dispatch(globalSlice.actions.changeBackdrop(false));

         return data;
      } catch (e) {
         dispatch(globalSlice.actions.changeBackdrop(false));
         console.error(e);
         throw e;
      }
   }
);

export const getGameAndFilterAndPaging = createAsyncThunk(
   "game/filterAndPaging",
   async (page, { getState, dispatch }) => {
      const state = getState();
      dispatch(globalSlice.actions.changeBackdrop(true));

      try {
         const response = await apid.get(`/games/search/${page}`, {
            params: {
               name: state.productSlice.filter.name,
               from: state.productSlice.filter.price.from,
               to: state.productSlice.filter.price.to,
               category: state.productSlice.filter.category,
            },
         });
         const data = await response.data;
         data.currentPage = page;
         dispatch(globalSlice.actions.changeBackdrop(false));

         return data;
      } catch (e) {
         dispatch(globalSlice.actions.changeBackdrop(false));
         console.log(e);
         throw e;
      }
   }
);

export const gamesPagingSelector = (state) => state.productSlice.products;
export const statusGame = (state) => state.productSlice.status;
export const pageSelector = (state) => state.productSlice.products.page;
export const filterSelector = (state) => state.productSlice.filter;
