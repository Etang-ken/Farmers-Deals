import { createSlice } from "@reduxjs/toolkit";

export const breadcrumbTitleSlice = createSlice({
  name: "breadcrumbTitle",
  initialState: {
    title: '',
  },
  reducers: {
    updateBreadcrumbTitleShow: (state, payload) => {
      state.title = payload.payload;
    },
  },
});

export const { updateBreadcrumbTitleShow } = breadcrumbTitleSlice.actions;

export default breadcrumbTitleSlice.reducer;
