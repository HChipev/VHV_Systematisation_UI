import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import isEmpty from 'lodash-es/isEmpty'
import { enqueueSnackbar } from 'notistack'

// UTILS
import { handleApiError, hasRole } from 'src/shared/utils'
import { useLogout } from 'src/shared/mutations'

// SELECTORS
import { getUserRoles } from 'src/shared/userSelectors'

// ACTIONS
import { actions } from 'src/shared/userActions'

// COMPONENTS & STYLES
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import {
  StyledDrawer,
  StyledListItemButton,
  StyledListItemIcon,
} from 'src/sidebar/styles'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// CONSTANTS
import { SIDE_BAR_ROUTES } from 'src/sidebar/constants'
import { SESSION_STORAGE_TOKEN_KEY } from 'src/shared/constants'

export const Sidebar: React.FC = () => {
  const theme = useTheme()

  const { mutate, isPending } = useLogout()

  const userRoles = useSelector(getUserRoles)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Box display="flex" height="100%">
      <StyledDrawer variant="permanent">
        <Box
          display="flex"
          height="100%"
          flexDirection="column"
          justifyContent="space-between"
          padding={theme.spacing(3, 1.5, 2.5)}
        >
          <Box display="flex" flexDirection="column" gap={theme.spacing(3)}>
            <List disablePadding>
              {SIDE_BAR_ROUTES.map(({ text, route, icon, requiredRoles }) => {
                const isSelected = route === pathname

                const shouldRenderRouteLink =
                  isEmpty(requiredRoles) || hasRole(requiredRoles, userRoles)

                return (
                  shouldRenderRouteLink && (
                    <ListItem key={text} disablePadding>
                      <StyledListItemButton
                        selected={isSelected}
                        onClick={() => navigate(route)}
                      >
                        <StyledListItemIcon isSelected={isSelected}>
                          {icon}
                        </StyledListItemIcon>

                        <ListItemText primary={text} />
                      </StyledListItemButton>
                    </ListItem>
                  )
                )
              })}
            </List>
          </Box>

          <Box display="flex" flexDirection={'column'} gap={theme.spacing(1)}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                dispatch(actions.setUserRoles([]))
                sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY)
                mutate(undefined, {
                  onSuccess: () => {
                    enqueueSnackbar('Logged out successfully', {
                      variant: 'success',
                    })
                  },
                  onError: handleApiError,
                })
              }}
              loading={isPending}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </StyledDrawer>
    </Box>
  )
}
