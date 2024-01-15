import { createSlice } from '@reduxjs/toolkit'

export const farmerSlice = createSlice({
  name: 'farmer',
  initialState: {
    user: {}
  },
  reducers: {
    updateUser: (state, payload) => {
      state.user = payload.payload
      console.log('this is user data: ',state.user)
    },
  },
})

export const { updateUser } = farmerSlice.actions

export default farmerSlice.reducer