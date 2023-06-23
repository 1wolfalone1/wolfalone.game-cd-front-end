import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export default createSlice({
   name: "globalSlice",
   initialState: {
      openBackdrop: false,
      navActive: 1,
   },
   reducers: {
      changeBackdrop: (state, action) => {
         state.openBackdrop = action.payload;
      },
      changeNavActive: (state, action) => {
         state.navActive = action.payload;
      }
   },
});



export const globalSliceSelector = state => state.globalSlice