import { createSlice } from '@reduxjs/toolkit'
import initState from "../state";

const infoSlice = createSlice({
  name: 'info',
  initialState: initState,
  reducers: {
    setCollapsed: (state) => {
      state.collapsed = !state.collapsed
    },
    setColorPrimary: (state, action) => {
      state.theme = action.payload
    }
  }
})

export const { setCollapsed, setColorPrimary } = infoSlice.actions
export default infoSlice.reducer