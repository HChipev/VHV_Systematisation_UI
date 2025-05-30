import * as React from 'react'
import { format } from 'date-fns'

// COMPONENTS
import { Box, TextField, Button, useTheme, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

// TYPES & CONSTANTS
import { ScanDocumentsFilters } from 'src/documents/types'

interface Props {
  onFilter: (filters: ScanDocumentsFilters) => void
  filters: ScanDocumentsFilters
}

export const ScannedDocumentsFilters: React.FC<Props> = ({
  onFilter,
  filters,
}) => {
  const theme = useTheme()

  const [name, setName] = React.useState<string | null>(filters?.name ?? null)
  const [startCreatedDateTime, setStartCreatedDateTime] =
    React.useState<Date | null>(filters?.startCreatedDateTime ?? null)
  const [endCreatedDateTime, setEndCreatedDateTime] =
    React.useState<Date | null>(filters?.endCreatedDateTime ?? null)

  const handleFilter = () => {
    onFilter({
      name: name ?? undefined,
      startCreatedDateTime: startCreatedDateTime ?? undefined,
      endCreatedDateTime: endCreatedDateTime ?? undefined,
    })
  }

  const handleReset = () => {
    onFilter({})
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={theme.spacing(1)}
      gap={theme.spacing(2)}
      height="100%"
      width="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Name</Typography>

        <TextField
          value={name ?? ''}
          label="Name"
          fullWidth
          margin="none"
          onChange={(e) => setName(e.target.value)}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Created Date Time</Typography>

        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          gap={theme.spacing(1)}
        >
          <DatePicker
            label="Start Date"
            value={startCreatedDateTime}
            onChange={(value) =>
              setStartCreatedDateTime(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />

          <DatePicker
            label="End Date"
            value={endCreatedDateTime}
            onChange={(value) =>
              setEndCreatedDateTime(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Box>

        <Box display="flex" justifyContent="end" width="100%">
          <Button
            size="small"
            onClick={() => {
              setStartCreatedDateTime(null)
              setEndCreatedDateTime(null)
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" width="100%">
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>

        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Box>
    </Box>
  )
}
