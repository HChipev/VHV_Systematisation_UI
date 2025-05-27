import * as React from 'react'

// COMPONENTS
import { Typography, Button, Box, useTheme } from '@mui/material'

export const ErrorPage: React.FC = () => {
  const theme = useTheme()

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
      gap={theme.spacing(3)}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" color="error" gutterBottom>
          Oops!
        </Typography>

        <Typography variant="h6" gutterBottom>
          Something went wrong.
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </Button>
    </Box>
  )
}
