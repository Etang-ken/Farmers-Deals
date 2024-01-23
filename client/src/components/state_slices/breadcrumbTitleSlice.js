import { createSlice } from "@reduxjs/toolkit";

export const breadcrubTitleSlice = createSlice({
  name: "breadcrubTitle",
  initialState: {
    title: '',
  },
  reducers: {
    updateBreadcrubTitleShow: (state, payload) => {
      state.title = payload.payload;
    },
  },
});

export const { updateBreadcrubTitleShow } = breadcrubTitleSlice.actions;

export default breadcrubTitleSlice.reducer;
