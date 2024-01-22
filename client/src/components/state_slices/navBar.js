import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sideBar",
  initialState: {
    show: true,
  },
  reducers: {
    updateSidebarShow: (state, payload) => {
      state.show = payload.payload;
    },
  },
});

export const { updateSidebarShow } = sidebarSlice.actions;

export default sidebarSlice.reducer;
