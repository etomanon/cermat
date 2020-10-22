import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SchoolState, School } from './school-types'

const initialState: SchoolState = {
  schoolSelected: undefined,
  schoolSelectedCompare: undefined,
}

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    schoolSet(state, action: PayloadAction<School | undefined>) {
      const { payload } = action
      state.schoolSelected = payload
    },
    schoolCompareSet(state, action: PayloadAction<School | undefined>) {
      const { payload } = action
      state.schoolSelectedCompare = payload
    },
  },
})

export const { schoolSet, schoolCompareSet } = schoolSlice.actions

export const school = schoolSlice.reducer
