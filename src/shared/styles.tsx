// COMPONENTS
import { styled } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// TYPES & CONSTANTS
import { COLORS } from 'src/shared/colors'

export const StyledDataGrid = styled(DataGrid)(() => ({
  '& .MuiDataGrid-row:nth-of-type(even)': {
    backgroundColor: COLORS.neutralGray20,
  },
  '& .MuiDataGrid-row:nth-of-type(even):hover': {
    backgroundColor: COLORS.neutralGray40,
  },
}))
