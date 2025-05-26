import * as React from 'react'

// COMPONENTS & STYLES
import Button from '@mui/material/Button'
import FilterListIcon from '@mui/icons-material/FilterList'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// CONSTANTS
import { FILTERS_MENU_ID } from 'src/shared/constants'
import { COLORS } from 'src/shared/colors'

interface Props {
  children: React.ReactNode
}

export const TableFiltersMenu: React.FC<Props> = ({ children }) => {
  const theme = useTheme()

  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null
  )

  const isOpen = Boolean(anchorElement)
  const onCloseHandler = () => setAnchorElement(null)

  return (
    <Box display="flex" flexGrow={1} justifyContent="flex-end">
      <Button
        size="large"
        startIcon={<FilterListIcon />}
        onClick={(event: React.MouseEvent<HTMLElement>) =>
          setAnchorElement(event.currentTarget)
        }
        aria-controls={isOpen ? FILTERS_MENU_ID : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
      >
        Filter
      </Button>

      <Menu
        anchorEl={anchorElement}
        id={FILTERS_MENU_ID}
        open={isOpen}
        onClose={onCloseHandler}
      >
        <Box
          display="flex"
          flexDirection="column"
          width="500px"
          padding={theme.spacing(2)}
          gap={theme.spacing(2)}
        >
          <Box
            padding={theme.spacing(0, 0, 2)}
            borderBottom={`1px solid ${COLORS.neutralGray20}`}
          >
            <Typography variant="h5">Filter</Typography>
          </Box>

          <Box display="flex" gap={theme.spacing(5)} flexDirection="column">
            {children}
          </Box>
        </Box>
      </Menu>
    </Box>
  )
}
