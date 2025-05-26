import * as React from 'react'

// COMPONENTS
import { StyledDataGrid } from 'src/shared/styles'

// TYPES & CONSTANTS
import { PAGE_SIZE_OPTIONS } from 'src/shared/constants'
import { DataGridProps } from '@mui/x-data-grid'
import { PaginationMetadataBase } from 'src/shared/types'

interface Props extends DataGridProps {
  paginationMetadata: PaginationMetadataBase
}

export const Table: React.FC<Props> = (props) => {
  const { paginationMetadata, onPaginationModelChange, paginationModel } = props

  return (
    <StyledDataGrid
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      paginationModel={paginationModel}
      rowCount={paginationMetadata.count}
      onPaginationModelChange={onPaginationModelChange}
      paginationMode="server"
      sortingMode="server"
      rowSelection={false}
      columnVisibilityModel={{ id: false }}
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      {...props}
    />
  )
}
