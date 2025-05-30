import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

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
import { Box, Button, Typography, useTheme } from '@mui/material'

// ICONS
import { DownloadOutlined } from '@mui/icons-material'

// TYPES & CONSTANTS
import { columns } from 'src/documents/saved/columns'
import { GridSortModel } from '@mui/x-data-grid'
import { PaginationMetadataBase } from 'src/shared/types'
import { SavedDocument } from 'src/documents/types'
import { enqueueSnackbar } from 'notistack'
import { format } from 'date-fns'

interface Props {
  onPreviewFile: (file: string, fileName: string) => void
  onUpdate: (data: SavedDocument) => void
}

export const SavedDocumentsTable: React.FC<Props> = ({
  onPreviewFile,
  onUpdate,
}) => {
  const theme = useTheme()

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
    employee: tableFilters.employee,
  })

  let items: SavedDocument[] = []
  let metadata: PaginationMetadataBase = { page: 1, pageSize: 25, count: 0 }

  if (data) {
    ;({ items, metadata } = data)
  }

  const handleDownloads = async () => {
    if (!items || items.length === 0) {
      return
    }

    const downloadableItems = items.filter((item) => item.file)
    if (downloadableItems.length === 0) {
      return
    }

    const zip = new JSZip()

    downloadableItems.forEach((item) => {
      const { file, name } = item

      try {
        const byteCharacters = atob(file)
        const byteNumbers = new Array(byteCharacters.length)

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        zip.file(`${name}.pdf`, byteArray)
      } catch {
        enqueueSnackbar(`Error preparing file: ${item.name}`, {
          variant: 'error',
        })
      }
    })

    try {
      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(
        content,
        `${
          tableFilters.startIssuedDate && tableFilters.endIssuedDate
            ? `${format(tableFilters.startIssuedDate, 'dd/MM/yyyy')}-${format(
                tableFilters.endIssuedDate,
                'dd/MM/yyyy'
              )}.zip`
            : 'documents.zip'
        }`
      )
    } catch {
      enqueueSnackbar('Error creating ZIP file', { variant: 'error' })
    }
  }

  return (
    <Table
      genericHeaderActionComponent={
        <Button
          variant="contained"
          size="small"
          disabled={!items || items.length === 0}
          onClick={handleDownloads}
        >
          <Box
            component="span"
            display="flex"
            alignItems="center"
            gap={theme.spacing(0.5)}
          >
            <Typography variant="body2">Download</Typography>

            <DownloadOutlined />
          </Box>
        </Button>
      }
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
      columns={columns(onPreviewFile, onUpdate)}
      sortModel={tableSort}
      onSortModelChange={setTableSort}
    />
  )
}
