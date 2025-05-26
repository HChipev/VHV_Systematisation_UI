import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import { userReducer } from 'src/shared/userReducer'
import { scanDocumentFiltersReducer } from 'src/documents/scanned/scanDocumentFiltersReducer'
import { savedDocumentFiltersReducer } from 'src/documents/saved/savedDocumentFiltersReducer'

export const reducer = {
  user: userReducer,
  scanDocumentFilters: scanDocumentFiltersReducer,
  savedDocumentFilters: savedDocumentFiltersReducer,
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type StoreState = ReturnType<typeof store.getState>
