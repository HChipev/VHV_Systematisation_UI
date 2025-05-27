import * as React from 'react'
import { format } from 'date-fns'

// UTILS
import { useRoles } from 'src/shared/queries'

// COMPONENTS
import {
  Box,
  TextField,
  Button,
  useTheme,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

// TYPES & CONSTANTS
import { UserFilters } from 'src/admin/types'
import { Roles } from 'src/shared/types'

interface Props {
  onFilter: (filters: UserFilters) => void
  filters: UserFilters
}

export const UsersFilters: React.FC<Props> = ({ onFilter, filters }) => {
  const theme = useTheme()

  const { data: roleOptions } = useRoles()

  const [email, setEmail] = React.useState<string | null>(
    filters?.email ?? null
  )
  const [startCreatedDateTime, setStartCreatedDateTime] =
    React.useState<Date | null>(filters?.startCreatedDateTime ?? null)
  const [endCreatedDateTime, setEndCreatedDateTime] =
    React.useState<Date | null>(filters?.endCreatedDateTime ?? null)
  const [roles, setRoles] = React.useState<Roles[] | null>(
    filters?.roles ?? null
  )

  const handleFilter = () => {
    onFilter({
      email: email ?? undefined,
      startCreatedDateTime: startCreatedDateTime ?? undefined,
      endCreatedDateTime: endCreatedDateTime ?? undefined,
      roles: roles ?? undefined,
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
        <Typography variant="body2">Email</Typography>

        <TextField
          value={email ?? ''}
          label="Email"
          fullWidth
          margin="none"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Roles</Typography>

        <FormControl fullWidth>
          <InputLabel id="role-label">Roles</InputLabel>

          <Select
            multiple
            labelId="role-label"
            name="roleId"
            value={roles ?? []}
            label="Roles"
            onChange={(e) => setRoles(e.target.value as Roles[])}
          >
            {roleOptions?.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
