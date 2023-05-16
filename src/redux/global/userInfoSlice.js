

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export default createSlice({
   name: "userInfo",
   initialState: {
      status: "guest",
      info: {

      }
   },
   reducers: {

   }
})


export const statusSelector = state => state.userInfo.status