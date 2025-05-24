import * as React from "react";
import { Outlet } from "react-router";

// COMPONENTS & STYLES
import { ErrorBoundary } from "react-error-boundary";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { CircularProgress, GlobalStyles } from "@mui/material";

export const AppWrapper: React.FC = () => (
  <>
    <CssBaseline />

    <GlobalStyles
      styles={() => ({
        body: {
          width: "100%",
          height: "100%",
        },
      })}
    />

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
          {/* //TODO: Add Sidebar component here if needed */}
          <Box display="flex" width="100%" minWidth="0" flexDirection="column">
            <React.Suspense fallback={<CircularProgress />}>
              <Outlet />
            </React.Suspense>
          </Box>
        </Box>
      </ErrorBoundary>
    </Box>
  </>
);
