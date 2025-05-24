import * as React from 'react'

// TYPES
import { Roles } from 'src/shared/types'

export interface SidebarRoutesConfig {
  text: string
  route: string
  icon: React.ReactElement
  requiredRoles: Roles[]
}
