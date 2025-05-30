import * as React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AxiosError } from 'axios'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// UTILS
import { store } from 'src/redux/store'

// COMPONENTS
import { SnackbarNotification } from 'src/shared/components/SnackbarNotification'

// CONSTANTS
import { routeConfig } from 'src/shared/routeConfig'

const router = createBrowserRouter(routeConfig)

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const errorStatus = (error as AxiosError).response?.status

        // NOTE: Avoid retries for queries which are failing with an expected failure or 500 codes
        if (errorStatus && errorStatus >= 400) {
          return false
        }

        const defaultRetry = new QueryClient().getDefaultOptions().queries
          ?.retry
        return Number.isSafeInteger(defaultRetry)
          ? failureCount < ((defaultRetry as number) ?? 0)
          : false
      },
    },
  },
  mutationCache: new MutationCache({
    onError: (error: Error) => {
      const axiosError = error as AxiosError

      if (
        axiosError.response?.status === 403 ||
        axiosError.response?.status === 401
      ) {
        window.history.back()
      }
    },
  }),
  queryCache: new QueryCache({
    onError: (error: Error) => {
      const axiosError = error as AxiosError

      if (
        axiosError.response?.status === 403 ||
        axiosError.response?.status === 401
      ) {
        window.history.back()
      }
    },
  }),
})

export const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        Components={{ default: SnackbarNotification }}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </SnackbarProvider>
    </Provider>
  </QueryClientProvider>
)
