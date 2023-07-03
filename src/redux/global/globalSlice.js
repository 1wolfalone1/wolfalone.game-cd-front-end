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
   },
});



export const globalSliceSelector = state => state.globalSlice