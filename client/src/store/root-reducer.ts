import { combineReducers } from '@reduxjs/toolkit'

import { school } from './modules/school/school'

export const rootReducer = combineReducers({
  school,
})

export type RootState = ReturnType<typeof rootReducer>
