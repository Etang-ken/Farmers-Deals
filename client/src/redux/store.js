import { configureStore } from '@reduxjs/toolkit'
import farmerReducer from '../components/state_slices/farmerSlice'
import farmerProductsReducer from '../components/state_slices/farmerProductsSlice'
import sidebarShowReducer from '../components/state_slices/navBar'

export default configureStore({
  reducer: {
    farmer: farmerReducer,
    farmerProducts: farmerProductsReducer,
    sidebarShow: sidebarShowReducer
  },
})