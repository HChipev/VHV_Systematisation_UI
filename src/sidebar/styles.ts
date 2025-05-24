// COMPONENTS
import Drawer from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { styled } from '@mui/material/styles'

// CONSTANTS
import { COLORS } from 'src/shared/colors'

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  minHeight: 48,
  gap: theme.spacing(1),
  justifyContent: 'center',
}))

export const StyledDrawer = styled(Drawer)(() => ({
  width: 240,

  '& .MuiDrawer-paper': {
    width: 240,
  },
}))

export const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{
  isSelected: boolean
}>(({ isSelected }) => ({
  color: isSelected ? COLORS.neutralGrayWhite : COLORS.neutralGray90,
}))
