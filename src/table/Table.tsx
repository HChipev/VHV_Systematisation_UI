import * as React from 'react'

// COMPONENTS
import { StyledDataGrid } from 'src/shared/styles'
import { Box, Typography, useTheme } from '@mui/material'
import { TableFiltersMenu } from 'src/table/components/TableFilterMenu'

// TYPES & CONSTANTS
import { PAGE_SIZE_OPTIONS } from 'src/shared/constants'
import { DataGridProps } from '@mui/x-data-grid'
import { PaginationMetadataBase } from 'src/shared/types'

interface Props extends DataGridProps {
  paginationMetadata: PaginationMetadataBase
  tableHeader: string
  filtersComponent?: React.ReactNode
  genericHeaderActionComponent?: React.ReactNode
}

export const Table: React.FC<Props> = (props) => {
  const theme = useTheme()

  const {
    paginationMetadata,
    onPaginationModelChange,
    paginationModel,
    tableHeader,
    filtersComponent,
    genericHeaderActionComponent,
  } = props

  const toolbarComponent = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      padding={theme.spacing(3, 3, 2)}
      borderBottom={`1px solid ${theme.palette.divider}`}
    >
      <Typography variant="h4" noWrap title={tableHeader}>
        {tableHeader}
      </Typography>

      {genericHeaderActionComponent}

      {filtersComponent && (
        <TableFiltersMenu>{filtersComponent}</TableFiltersMenu>
      )}
    </Box>
  )

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
      slots={{
        toolbar: () => toolbarComponent,
      }}
      showToolbar
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      {...props}
    />
  )
}
