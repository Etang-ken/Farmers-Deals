import { createSlice } from "@reduxjs/toolkit";

export const farmerProductsSlice = createSlice({
  name: "farmerProducts",
  initialState: {
    products: [],
  },
  reducers: {
    updateProducts: (state, payload) => {
      state.products = payload.payload
    },
  },
});

export const { updateProducts } = farmerProductsSlice.actions;

export default farmerProductsSlice.reducer;
