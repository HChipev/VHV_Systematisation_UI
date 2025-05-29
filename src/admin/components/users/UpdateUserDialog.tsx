import * as React from 'react'
import { enqueueSnackbar } from 'notistack'

// UTILS
import { useEmployees, useRoles } from 'src/shared/queries'

// COMPONENTS
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  MenuItem,
  FormHelperText,
} from '@mui/material'

// ICONS
import { Close, Visibility, VisibilityOff } from '@mui/icons-material'

// TYPES & CONSTANTS
import { Roles, User } from 'src/shared/types'
import { UpdateUserRequest } from 'src/admin/components/users/types'

interface Props {
  isOpen: boolean
  user: Partial<User>
  onClose: () => void
  onUpdate: (id: number, data: UpdateUserRequest) => void
}

export const UpdateUserDialog: React.FC<Props> = ({
  isOpen,
  user,
  onClose,
  onUpdate,
}) => {
  const theme = useTheme()

  const { data: roleOptions } = useRoles()
  const { data: userNameOptions } = useEmployees()

  const [password, setPassword] = React.useState('')
  const [userName, setUserName] = React.useState(user.userName || '')
  const [roles, setRoles] = React.useState(user.roles)
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof UpdateUserRequest, boolean>>
  >({})

  const handleUpdate = () => {
    if (!user.id) {
      enqueueSnackbar('User Id is required for update', {
        variant: 'error',
      })
      return
    }

    if (!roles || roles.length === 0 || !userName) {
      setErrors({
        roles: !roles || roles.length === 0,
        userName: !userName,
      })

      enqueueSnackbar('Please select at least one role', {
        variant: 'warning',
      })

      return
    }
    onUpdate(user.id, { password, roles, userName })
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between">
        <DialogTitle>Update User</DialogTitle>

        <IconButton onClick={onClose} color="error">
          <Close />
        </IconButton>
      </Box>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={theme.spacing(3)}>
          <TextField
            label="Email"
            value={user.email}
            disabled
            fullWidth
            margin="none"
          />

          <TextField
            label="Password"
            value={password}
            fullWidth
            margin="none"
            onChange={(e) => setPassword(e.target.value)}
            required
            type={isPasswordVisible ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setIsPasswordVisible((show) => !show)}
                      edge="end"
                      size="large"
                    >
                      {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl fullWidth error={Boolean(errors.userName)} required>
            <InputLabel id="user-name-label">User Name</InputLabel>

            <Select
              labelId="user-name-label"
              value={userName}
              label="User Name"
              onChange={(event) => setUserName(event.target.value)}
            >
              {userNameOptions?.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {`${option.name}(${option.description})`}
                </MenuItem>
              ))}
            </Select>

            <Box display="flex" justifyContent="end" width="100%">
              <Button size="small" onClick={() => setUserName('')}>
                Reset
              </Button>
            </Box>

            {errors.userName && <FormHelperText>Required</FormHelperText>}
          </FormControl>

          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            gap={theme.spacing(1)}
          >
            <FormControl fullWidth error={Boolean(errors.roles)} required>
              <InputLabel id="role-label">Roles</InputLabel>

              <Select
                multiple
                labelId="role-label"
                label="Roles"
                name="roles"
                value={roles ?? []}
                onChange={(e) => setRoles(e.target.value as Roles[])}
              >
                {roleOptions?.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>

              <Box display="flex" justifyContent="end" width="100%">
                <Button size="small" onClick={() => setRoles([])}>
                  Reset
                </Button>
              </Box>

              {errors.roles && <FormHelperText>Required</FormHelperText>}
            </FormControl>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          onClick={() => handleUpdate()}
          color="primary"
          variant="contained"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}
