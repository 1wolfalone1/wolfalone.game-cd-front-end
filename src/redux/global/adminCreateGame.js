import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import { apid } from "../../api/API";

const initialState = {
   listImage: [],
   formData: "",
   listRemoveUpdate: [],
   mode: 'create'
};
const adminCreateGameSlice = createSlice({
   name: "adminCreateGameSlice",
   initialState: initialState,
   reducers: {
      changeListImage: (state, action) => {
         state.listImage.push(action.payload);
      },
      changeFormData: (state, action) => {
         state.formData = action.payload;
      },
      removeImage: (state, action) => {
         const newList = state.listImage.filter(
            (image) => image.id !== action.payload.id
         );
         console.log(newList);
         state.listImage = newList;
      }, 
      resetState: (state, action) => {
         return initialState;
      },
   },
   extraReducers: (builder) =>
   builder
      .addCase(getGameForAdminUpdate.fulfilled, (state, action) => {
         state.formData = action.payload.data;
         state.listImage = action.payload.images;
         state.mode = 'update';
      })
      .addCase(getGameForAdminUpdate.pending, (state, action) => {
      })
      .addCase(getGameForAdminUpdate.rejected, (state, action) => {
         console.log(action.payload)
      })
});
export const getGameForAdminUpdate = createAsyncThunk(
   "adminCreateGameSlice/getGameForAdminUpdate",
   async (id, { getState, dispatch }) => {
      dispatch(globalSlice.actions.changeBackdrop(true));
      try {
         const response = await apid.get(`/admin/games/details/${id}`);
         const data = await response.data;
         dispatch(globalSlice.actions.changeBackdrop(false));
         return data;
      } catch (e) {
         dispatch(globalSlice.actions.changeBackdrop(false));
         console.log(e);
         throw e;
      }
   }
);
export default adminCreateGameSlice;

export const adminCreateGameSelector = (state) => state.adminCreateGameSlice;
