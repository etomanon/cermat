import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SchoolState, School } from './school-types'

const initialState: SchoolState = {
  schoolSelected: undefined,
}

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    schoolSet(state, action: PayloadAction<School | undefined>) {
      const { payload } = action
      state.schoolSelected = payload
    },
  },
})

export const { schoolSet } = schoolSlice.actions

export const school = schoolSlice.reducer
