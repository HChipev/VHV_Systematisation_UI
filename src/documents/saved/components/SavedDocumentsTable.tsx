import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// SELECTORS
import { getSavedDocumentFilters } from 'src/documents/saved/savedDocumentFiltersSelectors'

// ACTIONS
import { actions } from 'src/documents/saved/savedDocumentFiltersActions'

// UTILS
import { useSavedDocuments } from 'src/shared/queries'
import { usePagination } from 'src/shared/utils'

// COMPONENTS
import { Table } from 'src/table/Table'
import { SavedDocumentsFilters } from 'src/table/components/SavedDocumentsFilters'

// TYPES & CONSTANTS
import { columns } from 'src/documents/saved/columns'
import { GridSortModel } from '@mui/x-data-grid'
import { PaginationMetadataBase } from 'src/shared/types'
import { SavedDocument } from 'src/documents/types'

interface Props {
  onPreviewFile: (file: string) => void
}

export const SavedDocumentsTable: React.FC<Props> = ({ onPreviewFile }) => {
  const dispatch = useDispatch()

  const tableFilters = useSelector(getSavedDocumentFilters)

  const [paginationRequest, setPaginationRequest] = usePagination()
  const [tableSort, setTableSort] = React.useState<GridSortModel>([])

  const { data, isLoading } = useSavedDocuments({
    page: paginationRequest.page,
    pageSize: paginationRequest.pageSize,
    sortBy: tableSort[0]?.field,
    sortDirection: tableSort[0]?.sort,
    startCreatedDateTime: tableFilters.startCreatedDateTime,
    endCreatedDateTime: tableFilters.endCreatedDateTime,
    startIssuedDate: tableFilters.startIssuedDate,
    endIssuedDate: tableFilters.endIssuedDate,
    fileNameDescription: tableFilters.fileNameDescription,
    documentType: tableFilters.documentType,
    expenseType: tableFilters.expenseType,
    vehicle: tableFilters.vehicle,
    office: tableFilters.office,
    startPeriodStartDate: tableFilters.startPeriodStartDate,
    endPeriodStartDate: tableFilters.endPeriodStartDate,
    startPeriodEndDate: tableFilters.startPeriodEndDate,
    endPeriodEndDate: tableFilters.endPeriodEndDate,
    documentNumber: tableFilters.documentNumber,
    minPrice: tableFilters.minPrice,
    maxPrice: tableFilters.maxPrice,
    paymentType: tableFilters.paymentType,
    startPaymentDate: tableFilters.startPaymentDate,
    endPaymentDate: tableFilters.endPaymentDate,
    counterpartyName: tableFilters.counterpartyName,
    counterpartyBulstat: tableFilters.counterpartyBulstat,
    descriptionType: tableFilters.descriptionType,
    description: tableFilters.description,
  })

  let items: SavedDocument[] = []
  let metadata: PaginationMetadataBase = { page: 1, pageSize: 10, count: 0 }

  if (data) {
    ;({ items, metadata } = data)
  }

  return (
    <Table
      tableHeader="Saved Documents"
      loading={isLoading}
      filtersComponent={
        <SavedDocumentsFilters
          filters={tableFilters}
          onFilter={(filters) =>
            dispatch(actions.setSavedDocumentFilters(filters))
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
      columns={columns(onPreviewFile)}
      sortModel={tableSort}
      onSortModelChange={setTableSort}
    />
  )
}
