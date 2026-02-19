import { combineReducers } from '@reduxjs/toolkit'
import serviceLogReducer from './serviceLog/serviceLogSlice'

export const rootReducer = combineReducers({
  serviceLog: serviceLogReducer,
})

export type RootState = ReturnType<typeof rootReducer>
