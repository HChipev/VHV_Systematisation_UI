import * as React from 'react'

// COMPONENTS & STYLES
import Typography from '@mui/material/Typography'
import {
  CollapseLinkContainer,
  StyledKeyboardTabIcon,
} from 'src/sidebar/styles'
import { useTheme } from '@mui/material/styles'

// CONSTANTS
import { COLORS } from 'src/shared/colors'

interface Props {
  isSidebarCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
}

export const CollapseLink: React.FC<Props> = ({
  isSidebarCollapsed,
  setIsCollapsed,
}) => {
  const theme = useTheme()

  return (
    <CollapseLinkContainer
      width={isSidebarCollapsed ? '100%' : 'fit-content'}
      alignItems="center"
      justifyContent={isSidebarCollapsed ? 'center' : 'initial'}
      gap={theme.spacing(0.5)}
      margin={isSidebarCollapsed ? theme.spacing(0) : theme.spacing(0, 0, 0, 2)}
      onClick={() => setIsCollapsed(!isSidebarCollapsed)}
    >
      <StyledKeyboardTabIcon isCollapsed={isSidebarCollapsed} />

      {!isSidebarCollapsed && (
        <Typography variant="h6" color={COLORS.primaryBlue60}>
          Collapse
        </Typography>
      )}
    </CollapseLinkContainer>
  )
}
