import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import isEmpty from 'lodash-es/isEmpty'
import { enqueueSnackbar } from 'notistack'

// UTILS
import { handleApiError, hasRole } from 'src/shared/utils'
import { useLogout } from 'src/shared/mutations'
import { useUserRoles } from 'src/shared/queries'

// SELECTORS
import { getUserRoles } from 'src/shared/userSelectors'

// ACTIONS
import { actions } from 'src/shared/userActions'

// COMPONENTS & STYLES
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import {
  StyledDrawer,
  StyledList,
  StyledListItemButton,
  StyledListItemIcon,
} from 'src/sidebar/styles'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { CollapseLink } from 'src/sidebar/components/CollapseLink'

// ICONS
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

// CONSTANTS
import { SIDE_BAR_ROUTES } from 'src/sidebar/constants'
import { SESSION_STORAGE_TOKEN_KEY } from 'src/shared/constants'
import { ROUTES } from 'src/shared/routes'

export const Sidebar: React.FC = () => {
  const theme = useTheme()

  const { mutate, isPending } = useLogout()
  const { data } = useUserRoles()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  React.useEffect(() => {
    if (data) {
      dispatch(actions.setUserRoles(data))
    }
  }, [data, dispatch])

  const userRoles = useSelector(getUserRoles)

  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <Box display="flex" height="100%">
      <StyledDrawer isCollapsed={isCollapsed} variant="permanent">
        <Box
          display="flex"
          height="100%"
          flexDirection="column"
          justifyContent="space-between"
          padding={theme.spacing(3, 1.5, 2.5)}
        >
          <Box display="flex" flexDirection="column" gap={theme.spacing(3)}>
            {/* //TODO: Add logo component */}

            <CollapseLink
              isSidebarCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />

            <StyledList disablePadding>
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

                        {!isCollapsed && <ListItemText primary={text} />}
                      </StyledListItemButton>
                    </ListItem>
                  )
                )
              })}
            </StyledList>
          </Box>

          <Box display="flex" gap={theme.spacing(1)}>
            <Button
              variant="outlined"
              fullWidth={!isCollapsed}
              onClick={() => {
                mutate(undefined, {
                  onSuccess: () => {
                    dispatch(actions.setUserRoles([]))
                    sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY)
                    navigate(ROUTES.LOGIN_ROUTE)
                    enqueueSnackbar('Logged out successfully', {
                      variant: 'success',
                    })
                  },
                  onError: handleApiError,
                })
              }}
              loading={isPending}
            >
              <LogoutOutlinedIcon />

              {!isCollapsed && 'Logout'}
            </Button>
          </Box>
        </Box>
      </StyledDrawer>
    </Box>
  )
}
