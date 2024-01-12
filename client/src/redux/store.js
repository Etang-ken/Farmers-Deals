import { configureStore } from '@reduxjs/toolkit'
import farmerReducer from '../components/state_slices/farmerSlice'

export default configureStore({
  reducer: {
    farmer: farmerReducer
  },
})