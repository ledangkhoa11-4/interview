import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "interfaces/categories";

export interface ICategoryState {
  isLoading: boolean;
  data: ICategory[];
}

const initialState: ICategoryState = {
  isLoading: false,
  data: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoriesReducer(state: ICategoryState, action: PayloadAction<ICategoryState>) {
      state.isLoading = action.payload.isLoading;
      state.data = action.payload.data;
    },
  },
});

export const { setCategoriesReducer } = categorySlice.actions;

export default categorySlice.reducer;