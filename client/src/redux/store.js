import { configureStore } from "@reduxjs/toolkit";
import farmerReducer from "../components/state_slices/farmerSlice";
import farmerProductsReducer from "../components/state_slices/farmerProductsSlice";
import sidebarShowReducer from "../components/state_slices/navBar";
import breadcrumbTitleReducer from "../components/state_slices/breadcrumbTitleSlice";
import buyerReducer from "../components/state_slices/buyer/buyerSlice";

export default configureStore({
  reducer: {
    farmer: farmerReducer,
    farmerProducts: farmerProductsReducer,
    sidebarShow: sidebarShowReducer,
    breadcrumbTitle: breadcrumbTitleReducer,
    buyer: buyerReducer,
  },
});
