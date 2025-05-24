import * as React from 'react'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

// UTILS
import { useLogin } from 'src/shared/mutations'
import { handleApiError } from 'src/shared/utils'

// COMPONENTS
import {
  Box,
  Paper,
  Typography,
  TextField,
  Stack,
  IconButton,
  InputAdornment,
  Button,
} from '@mui/material'

// ICONS
import { Visibility, VisibilityOff } from '@mui/icons-material'

// CONSTANTS
import { COLORS } from 'src/shared/colors'
import { SESSION_STORAGE_TOKEN_KEY } from 'src/shared/constants'
import { ROUTES } from 'src/shared/routes'

export const LoginPage: React.FC = () => {
  const { mutate, isPending } = useLogin()

  const navigate = useNavigate()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    mutate(
      { email, password },

      {
        onSuccess: (data) => {
          sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY, data.token)

          enqueueSnackbar('Login successful!', {
            variant: 'success',
          })

          navigate(ROUTES.HOMEPAGE_ROUTE)
        },
        onError: handleApiError,
      }
    )
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
      bgcolor={COLORS.neutralGrayWhite}
    >
      <Paper elevation={1}>
        <Box p={3} minWidth={300}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                size="small"
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />

              <TextField
                size="small"
                label="Password"
                type={isPasswordVisible ? 'text' : 'password'}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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
                          {isPasswordVisible ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                loading={isPending}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Box>
  )
}
