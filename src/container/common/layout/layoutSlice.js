

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export default createSlice({
   name: "layout",
   initialState: {
      status: "",
      info: {

      }
   },
   reducers: {
      updateLayout: (state, action) => {
         state.status = action.payload;
      }
   }
})


export const statusLayoutSelector = state => state.layout.status