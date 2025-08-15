import { configureStore } from "@reduxjs/toolkit";
import supportReducer from '../features/supportForm/slices/supportFormSlice'

export const store = configureStore({
  reducer: {
    supportForm: supportReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
