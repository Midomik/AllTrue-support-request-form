import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SupportFormValues } from '../schema/supportFormSchema'

const initialState: SupportFormValues = {
  fullName: '',
  email: '',
  issueType: 'Bug Report',
  tags: [],
  steps: [],
}

const supportSlice = createSlice({
  name: 'supportForm',
  initialState,
  reducers: {
    saveForm(state, action: PayloadAction<SupportFormValues>) {
      state.fullName = action.payload.fullName
      state.email = action.payload.email
      state.issueType = action.payload.issueType
      state.tags = action.payload.tags
      state.steps = action.payload.steps
    },
  },
})

export const { saveForm } = supportSlice.actions
export default supportSlice.reducer
