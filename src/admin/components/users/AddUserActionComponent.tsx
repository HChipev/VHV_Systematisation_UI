import * as React from 'react'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'

// UTILS
import { handleApiError } from 'src/shared/utils'
import { useEmployees, useRoles } from 'src/shared/queries'
import { useAddUser } from 'src/shared/mutations'

// COMPONENTS
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  useTheme,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'

// ICONS
import {
  AddOutlined,
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'

// TYPES & CONSTANTS
import { AddUserRequest } from 'src/admin/components/users/types'
import { USERS_QUERY_KEY } from 'src/shared/queryKeys'
import { Roles } from 'src/shared/types'

export const AddUserActionComponent: React.FC = () => {
  const queryClient = useQueryClient()

  const theme = useTheme()

  const { mutate } = useAddUser()
  const { data: roleOptions } = useRoles()
  const { data: userNameOptions } = useEmployees()

  const [isOpen, setIsOpen] = React.useState(false)
  const [form, setForm] = React.useState<Partial<AddUserRequest>>({})
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof AddUserRequest, boolean>>
  >({})
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const handleSubmit = (data: AddUserRequest) => {
    if (
      !data.email ||
      !data.password ||
      !data.roles ||
      data.roles.length === 0 ||
      !data.userName
    ) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' })

      setErrors({
        email: !data.email,
        password: !data.password,
        roles: !data.roles || data.roles.length === 0,
        userName: !data.userName,
      })

      return
    }

    mutate(data, {
      onSuccess: () => {
        setForm({})
        setIsOpen(false)
        queryClient.invalidateQueries({
          queryKey: [USERS_QUERY_KEY],
        })
        enqueueSnackbar('User added successfully', {
          variant: 'success',
        })
      },
      onError: handleApiError,
    })
  }

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleRolesChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | (Event & {
        target: {
          value: unknown
          name: string
        }
      })) => {
    const roles = value as Roles[]
    setForm((prev) => ({ ...prev, [name]: roles }))
  }

  const onClose = () => {
    setIsOpen(false)
    setForm({})
    setErrors({})
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpen(true)}
        startIcon={<AddOutlined />}
        size="small"
      >
        Add User
      </Button>

      <Dialog open={isOpen} onClose={onClose}>
        <Box display="flex" justifyContent="space-between">
          <DialogTitle>Add User</DialogTitle>

          <IconButton onClick={onClose} color="error">
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={theme.spacing(3)}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="none"
              onChange={handleChange}
              required
              error={Boolean(errors.email)}
              helperText={errors.email ? 'Required' : undefined}
            />

            <TextField
              label="Password"
              name="password"
              fullWidth
              margin="none"
              onChange={handleChange}
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
              error={Boolean(errors.password)}
              helperText={errors.password ? 'Required' : undefined}
            />

            <FormControl fullWidth error={Boolean(errors.userName)} required>
              <InputLabel id="user-name-label">User Name</InputLabel>

              <Select
                labelId="user-name-label"
                name="userName"
                label="User Name"
                value={form?.userName}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    userName: event.target.value,
                  }))
                }
              >
                {userNameOptions?.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {`${option.name}(${option.description})`}
                  </MenuItem>
                ))}
              </Select>

              <Box display="flex" justifyContent="end" width="100%">
                <Button
                  size="small"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      userName: undefined,
                    }))
                  }
                >
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
              <FormControl fullWidth>
                <InputLabel id="role-label">Roles</InputLabel>

                <Select
                  multiple
                  labelId="role-label"
                  label="Roles"
                  name="roles"
                  value={form?.roles ?? []}
                  onChange={handleRolesChange}
                >
                  {roleOptions?.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>

                <Box display="flex" justifyContent="end" width="100%">
                  <Button
                    size="small"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        roles: [],
                      }))
                    }
                  >
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
            onClick={() => handleSubmit(form as AddUserRequest)}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
