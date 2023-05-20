import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export default createSlice({
   name: "userInfo",
   initialState: {
      status: "guest",
      info: {

      },
   },
   reducers: {
      changeAuthentication: (state, action) => {
         state.status = action.payload.status;
         state.info = action.payload.info;
      },
   },
});

export const statusSelector = (state) => state.userInfo.status;

export const infoUserSelector = (state) => state.userInfo.info