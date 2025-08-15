import { createSlice } from '@reduxjs/toolkit'

export type IssueType = 'Bug Report' | 'Feature Request' | 'General Inquiry'
export type Tag = 'UI' | 'Backend' | 'Performance'

export interface SupportFormData {
  fullName: string
  email: string
  issueType: IssueType
  tags: Tag[]
  steps: string[]
}

interface SupportState {
  data: SupportFormData | null
}

const initialState: SupportState = {
  data: null,
}

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
  },
})

// export const {} = supportSlice.actions
export default supportSlice.reducer
