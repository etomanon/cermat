import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, createSelectorHook } from 'react-redux'

import { rootReducer, RootState } from './root-reducer'

export const store = configureStore({
  reducer: rootReducer,
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root-reducer', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newRootReducer = require('./root-reducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = createSelectorHook<RootState>()
