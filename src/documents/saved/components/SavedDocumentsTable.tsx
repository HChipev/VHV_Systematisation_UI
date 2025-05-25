import * as React from 'react'

// UTILS
import { useSavedDocuments } from 'src/shared/queries'
import { usePagination } from 'src/shared/utils'

// COMPONENTS
import { StyledDataGrid } from 'src/shared/styles'

// TYPES & CONSTANTS
import { columns } from 'src/documents/saved/columns'
import { PAGE_SIZE_OPTIONS } from 'src/shared/constants'

interface Props {
  onPreviewFile: (file: string) => void
}

export const SavedDocumentsTable: React.FC<Props> = ({ onPreviewFile }) => {
  const [paginationRequest, setPaginationRequest] = usePagination()

  const {
    data: { items, metadata },
  } = useSavedDocuments(paginationRequest)

  return (
    <StyledDataGrid
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      paginationModel={{
        page: metadata.page - 1,
        pageSize: metadata.pageSize,
      }}
      rowCount={metadata.count}
      onPaginationModelChange={({ page, pageSize }) =>
        setPaginationRequest({ page: page + 1, pageSize })
      }
      paginationMode="server"
      rowSelection={false}
      columnVisibilityModel={{ id: false }}
      rows={items}
      columns={columns(onPreviewFile)}
    />
  )
}
