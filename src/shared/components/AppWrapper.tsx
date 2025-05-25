import * as React from 'react'
import { Outlet } from 'react-router'

// COMPONENTS & STYLES
import { ErrorBoundary } from 'react-error-boundary'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { Sidebar } from 'src/sidebar/Sidebar'
import CircularProgress from '@mui/material/CircularProgress'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// TYPES & CONSTANTS
import { globalStyles, themeOptions } from 'src/shared/themeConfig'

interface Props {
  shouldHideSidebar?: boolean
}

export const AppWrapper: React.FC<Props> = ({ shouldHideSidebar = false }) => (
  <>
    <CssBaseline />

    {globalStyles}

    <ThemeProvider theme={createTheme(themeOptions)}>
      <Box display="flex" height="100vh" width="100vw" flexDirection="column">
        <ErrorBoundary
          fallback={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <h2>Something went wrong.</h2>
            </Box>
          }
        >
          <Box display="flex" height="100%" width="100%">
            {!shouldHideSidebar && <Sidebar />}

            <Box
              display="flex"
              width="100%"
              minWidth="0"
              flexDirection="column"
            >
              <React.Suspense
                fallback={
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width="100%"
                  >
                    <CircularProgress />
                  </Box>
                }
              >
                <Outlet />
              </React.Suspense>
            </Box>
          </Box>
        </ErrorBoundary>
      </Box>
    </ThemeProvider>
  </>
)
