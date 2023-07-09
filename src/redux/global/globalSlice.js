import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export default createSlice({
   name: "globalSlice",
   initialState: {
      openBackdrop: false,
      navActive: 1,
      snackBar: {
         v: "bottom",
         h: "right",
         open: false,
         message: 'Something went wrong!',
         typeStatus: 'error',
         title: "Error"
      },
      adminGameTable: null,
      adminOrderTable: null,
      pageOrderAdminTable: 0,
   },
   reducers: {
      changeBackdrop: (state, action) => {
         state.openBackdrop = action.payload;
      },
      changeNavActive: (state, action) => {
         state.navActive = action.payload;
      },
      changeSnackBarState: (state, action) => {
         state.snackBar = { ...state.snackBar, ...action.payload };
      },
      changeAdminGameTable: (state, action) => {
         state.adminGameTable = action.payload;
      },
      changeAdminOrderTable: (state, action) => {
         state.adminOrderTable = action.payload.data;
         state.pageOrderAdminTable = action.payload.page
      }
   },
});



export const globalSliceSelector = state => state.globalSlice


export const getAdminGameTableSelector = state => state.globalSlice.adminGameTable;
export const getAdminGameOrderSelector = state => state.globalSlice.adminOrderTable;
export const getPageAdminOrderSelector = state => state.globalSlice.pageOrderAdminTable