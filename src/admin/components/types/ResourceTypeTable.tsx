import * as React from 'react'

// UTILS
import { usePagination } from 'src/shared/utils'

// COMPONENTS
import { Table } from 'src/table/Table'

// TYPES & CONSTANTS
import { columns } from 'src/admin/components/types/columns'
import { GridSortModel } from '@mui/x-data-grid'
import { UseQueryResult } from '@tanstack/react-query'
import { PaginatedResponse, PaginationMetadataBase } from 'src/shared/types'
import { ResourceTypeResponse } from 'src/documents/types'
import { ResourceTypeRequestQuery } from 'src/admin/components/types/types'
import { Box, CircularProgress } from '@mui/material'

interface Props {
  useQuery: (
    paginationQuery: ResourceTypeRequestQuery
  ) => UseQueryResult<
    PaginatedResponse<ResourceTypeResponse, PaginationMetadataBase>,
    Error
  >
  tableHeader: string
}

export const ResourceTypeTable: React.FC<Props> = ({
  useQuery,
  tableHeader,
}) => {
  const [paginationRequest, setPaginationRequest] = usePagination()
  const [tableSort, setTableSort] = React.useState<GridSortModel>([])

  const { data, isLoading } = useQuery({
    page: paginationRequest.page,
    pageSize: paginationRequest.pageSize,
    sortBy: tableSort[0]?.field,
    sortDirection: tableSort[0]?.sort,
  })

  if (isLoading || !data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <CircularProgress />
      </Box>
    )
  }

  const { items, metadata } = data

  return (
    <Table
      tableHeader={tableHeader}
      paginationMetadata={metadata}
      paginationModel={{
        page: metadata.page - 1,
        pageSize: metadata.pageSize,
      }}
      onPaginationModelChange={({ page, pageSize }) =>
        setPaginationRequest({ page: page + 1, pageSize })
      }
      rows={items}
      columns={columns}
      sortModel={tableSort}
      onSortModelChange={setTableSort}
    />
  )
}
