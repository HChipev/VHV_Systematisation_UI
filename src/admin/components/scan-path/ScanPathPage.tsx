import * as React from 'react'
import { enqueueSnackbar } from 'notistack'

// UTILS
import { useScanPath } from 'src/shared/queries'
import { handleApiError } from 'src/shared/utils'
import { useUpdateScanPath } from 'src/shared/mutations'

// COMPONENTS
import {
  Box,
  TextField,
  CircularProgress,
  Typography,
  useTheme,
} from '@mui/material'

export const ScanPathPage: React.FC = () => {
  const theme = useTheme()
  const { data, isLoading } = useScanPath()
  const { mutate } = useUpdateScanPath()

  const [path, setPath] = React.useState('')

  React.useEffect(() => {
    if (data?.path) {
      setPath(data.path)
    }
  }, [data])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value)
  }

  const handleBlur = () => {
    if (path !== data?.path) {
      mutate(
        { path },
        {
          onSuccess: () => {
            enqueueSnackbar('Scan path updated successfully', {
              variant: 'success',
            })
          },
          onError: handleApiError,
        }
      )
    }
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      p={theme.spacing(4)}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          gap={theme.spacing(2)}
          width="100%"
          maxWidth={theme.breakpoints.values.sm}
        >
          <Typography variant="h6" color="textPrimary">
            Configure Scan Path
          </Typography>

          <Typography variant="body2" color="textSecondary">
            Set the path for the scan documents.
          </Typography>

          <TextField
            label="Scan Path"
            variant="outlined"
            value={path}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Enter scan path"
            size="small"
            fullWidth
            disabled={isLoading}
          />
        </Box>
      )}
    </Box>
  )
}
