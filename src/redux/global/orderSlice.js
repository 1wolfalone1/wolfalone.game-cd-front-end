import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from './../../api/authenticationApi';
import { apid } from "../../api/API";

const orderSlice = createSlice({
   name: "globalSlice",
   initialState: {
      listOrder: [],
      listSelected: [],
      isLoading: false
   },
   reducers: {}
   ,
   extraReducers: (builder) =>
      builder
         .addCase(getOrderTable.fulfilled, (state, action) => {
            state.listOrder = action.payload;
         })
         .addCase(getOrderTable.pending, (state, action) => {
         })
         .addCase(getOrderTable.rejected, (state, action) => {
         })
});

export default orderSlice;

export const getOrderTable = createAsyncThunk(
   "orderSlice/getOrderTable",
   async (page, { dispatch }) => {
      
      try {
         const res = await apid.get('/order');
         const data = await res.data;
         console.log(data);
         return data;
      } catch (e) {
         console.log(e);
         throw e;
      }
   }
);

export const  orderSliceSelector = state => state.orderSlice;