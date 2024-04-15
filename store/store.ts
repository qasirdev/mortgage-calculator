import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { interestRateApiSlice } from './api/interestRateApiSlice'; 

const rootReducer = combineReducers({
  [interestRateApiSlice.reducerPath]: interestRateApiSlice.reducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(interestRateApiSlice.middleware)
    },
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type Store = ReturnType<typeof setupStore>
