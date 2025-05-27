import type { RouteObject } from 'react-router-dom'

// CONSTANTS
import { ROUTES } from 'src/shared/routes'

// COMPONENTS
import { PrivateRoute } from 'src/shared/components/PrivateRoute'
import { AppWrapper } from 'src/shared/components/AppWrapper'
import { LoginPage } from 'src/authentication/LoginPage'
import { DocumentsPage } from 'src/documents/DocumentsPage'
import { AdminPage } from 'src/admin/AdminPage'

export const routeConfig: RouteObject[] = [
  {
    path: ROUTES.HOMEPAGE_ROUTE,
    element: <PrivateRoute Component={AppWrapper} />,
    children: [
      {
        index: true,
        element: <DocumentsPage />,
      },
      {
        path: ROUTES.ADMIN_ROUTE,
        element: <AdminPage />,
      },
    ],
  },
  {
    path: ROUTES.HOMEPAGE_ROUTE,
    element: <AppWrapper shouldHideSidebar />,
    children: [
      {
        path: ROUTES.LOGIN_ROUTE,
        element: <LoginPage />,
      },
    ],
  },
]
