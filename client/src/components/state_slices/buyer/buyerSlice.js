import { createSlice } from '@reduxjs/toolkit'

export const buyerSlice = createSlice({
  name: 'buyer',
  initialState: {
    user: {}
  },
  reducers: {
    updateUser: (state, payload) => {
      state.user = payload.payload
    },
  },
})

export const { updateUser } = buyerSlice.actions

export default buyerSlice.reducer