// COMPONENTS
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { styled } from '@mui/material/styles'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab'

// CONSTANTS
import { COLORS } from 'src/shared/colors'

export const StyledList = styled(List, {
  shouldForwardProp: () => true,
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}))

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  minHeight: 48,
  gap: theme.spacing(1),
  justifyContent: 'center',
}))

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  width: isCollapsed ? 86 : 240,

  '& .MuiDrawer-paper': {
    width: isCollapsed ? 86 : 240,
  },
}))

export const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{
  isSelected: boolean
}>(({ isSelected }) => ({
  color: isSelected ? COLORS.neutralGrayWhite : COLORS.neutralGray90,
}))

export const StyledKeyboardTabIcon = styled(KeyboardTabIcon, {
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  transform: isCollapsed ? 'none' : 'rotate(180deg)',
  color: COLORS.primaryBlue60,
}))

export const CollapseLinkContainer = styled(Box)(() => ({
  display: 'flex',
  cursor: 'pointer',
}))
