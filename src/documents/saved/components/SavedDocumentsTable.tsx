import * as React from 'react'

// UTILS
import { useSavedDocuments } from 'src/shared/queries'
import { usePagination } from 'src/shared/utils'

// COMPONENTS
import { Table } from 'src/table/Table'

// TYPES & CONSTANTS
import { columns } from 'src/documents/saved/columns'
import { GridSortModel } from '@mui/x-data-grid'

interface Props {
  onPreviewFile: (file: string) => void
}

export const SavedDocumentsTable: React.FC<Props> = ({ onPreviewFile }) => {
  const [paginationRequest, setPaginationRequest] = usePagination()
  const [tableSort, setTableSort] = React.useState<GridSortModel>([])

  const {
    data: { items, metadata },
  } = useSavedDocuments({
    page: paginationRequest.page,
    pageSize: paginationRequest.pageSize,
    sortBy: tableSort[0]?.field,
    sortDirection: tableSort[0]?.sort,
  })

  return (
    <Table
      paginationMetadata={metadata}
      paginationModel={{
        page: metadata.page - 1,
        pageSize: metadata.pageSize,
      }}
      onPaginationModelChange={({ page, pageSize }) =>
        setPaginationRequest({ page: page + 1, pageSize })
      }
      rows={items}
      columns={columns(onPreviewFile)}
      sortModel={tableSort}
      onSortModelChange={setTableSort}
    />
  )
}
