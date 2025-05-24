import type { RouteObject } from 'react-router-dom'

// CONSTANTS
import { ROUTES } from 'src/shared/routes'

// COMPONENTS
import { PrivateRoute } from 'src/shared/components/PrivateRoute'
import { AppWrapper } from 'src/shared/components/AppWrapper'
import { LoginPage } from 'src/authentication/LoginPage'

export const routeConfig: RouteObject[] = [
  {
    path: ROUTES.HOMEPAGE_ROUTE,
    element: <PrivateRoute Component={AppWrapper} />,
    children: [
      //   {
      //     index: true,
      //     element: <DashboardPage />,
      //   },
    ],
  },
  {
    path: ROUTES.HOMEPAGE_ROUTE,
    element: <AppWrapper />,
    children: [
      {
        path: ROUTES.LOGIN_ROUTE,
        element: <LoginPage />,
      },
    ],
  },
]
