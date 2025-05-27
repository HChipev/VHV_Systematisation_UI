// ICONS
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined'
// TYPES & CONSTANTS
import { ROUTES } from 'src/shared/routes'
import { SidebarRoutesConfig } from 'src/sidebar/types'
import { Roles } from 'src/shared/types'

export const SIDE_BAR_ROUTES: SidebarRoutesConfig[] = [
  {
    text: 'Documents',
    route: ROUTES.HOMEPAGE_ROUTE,
    icon: <DocumentScannerOutlinedIcon />,
    requiredRoles: [],
  },
  {
    text: 'Admin',
    route: ROUTES.ADMIN_ROUTE,
    icon: <AdminPanelSettingsOutlinedIcon />,
    requiredRoles: [Roles.Admin],
  },
]
