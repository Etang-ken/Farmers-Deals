import { configureStore } from '@reduxjs/toolkit'
import farmerReducer from '../components/state_slices/farmerSlice'
import farmerProductsReducer from '../components/state_slices/farmerProductsSlice'

export default configureStore({
  reducer: {
    farmer: farmerReducer,
    farmerProducts: farmerProductsReducer
  },
})