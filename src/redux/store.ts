import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import { userReducer } from 'src/shared/userReducer'

export const reducer = { user: userReducer }

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type StoreState = ReturnType<typeof store.getState>
