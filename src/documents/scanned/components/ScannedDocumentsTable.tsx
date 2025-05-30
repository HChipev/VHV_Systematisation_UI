import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// SELECTORS
import { getScanDocumentFilters } from 'src/documents/scanned/scanDocumentFiltersSelectors'

// ACTIONS
import { actions } from 'src/documents/scanned/scanDocumentFiltersActions'

// UTILS
import { useScannedDocuments } from 'src/shared/queries'
import { usePagination } from 'src/shared/utils'

// COMPONENTS
import { Table } from 'src/table/Table'
import { ScannedDocumentsFilters } from 'src/table/components/ScannedDocumentsFilters'

// TYPES & CONSTANTS
import { columns } from 'src/documents/scanned/columns'
import { GridSortModel } from '@mui/x-data-grid'
import { ScannedDocument } from 'src/documents/types'
import { PaginationMetadataBase } from 'src/shared/types'

interface Props {
  onPreviewFile: (file: string, fileName: string) => void
  onSaveFile: (id: number) => void
}

export const ScannedDocumentsTable: React.FC<Props> = ({
  onPreviewFile,
  onSaveFile,
}) => {
  const dispatch = useDispatch()

  const tableFilters = useSelector(getScanDocumentFilters)

  const [paginationRequest, setPaginationRequest] = usePagination()
  const [tableSort, setTableSort] = React.useState<GridSortModel>([])

  const { data, isLoading } = useScannedDocuments({
    page: paginationRequest.page,
    pageSize: paginationRequest.pageSize,
    sortBy: tableSort[0]?.field,
    sortDirection: tableSort[0]?.sort,
    startCreatedDateTime: tableFilters.startCreatedDateTime,
    endCreatedDateTime: tableFilters.endCreatedDateTime,
    name: tableFilters.name,
  })

  let items: ScannedDocument[] = []
  let metadata: PaginationMetadataBase = { page: 1, pageSize: 25, count: 0 }

  if (data) {
    ;({ items, metadata } = data)
  }

  return (
    <Table
      tableHeader="Scanned Documents"
      loading={isLoading}
      filtersComponent={
        <ScannedDocumentsFilters
          filters={tableFilters}
          onFilter={(filters) =>
            dispatch(actions.setScanDocumentFilters(filters))
          }
        />
      }
      paginationMetadata={metadata}
      paginationModel={{
        page: metadata.page - 1,
        pageSize: metadata.pageSize,
      }}
      onPaginationModelChange={({ page, pageSize }) =>
        setPaginationRequest({ page: page + 1, pageSize })
      }
      rows={items}
      columns={columns(onPreviewFile, onSaveFile)}
      sortModel={tableSort}
      onSortModelChange={setTableSort}
    />
  )
}
