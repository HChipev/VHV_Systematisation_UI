// COMPONENTS
import { Box, Button } from '@mui/material'

// ICONS
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

// TYPES & CONSTANTS
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models'
import { SavedDocument } from 'src/documents/types'
import { format } from 'date-fns'
import { EditOutlined } from '@mui/icons-material'

enum SavedDocumentColumns {
  Id = 'id',
  Name = 'name',
  CreatedDateTime = 'createdDateTime',
  Action = 'action',
  IssuedDate = 'issuedDate',
  FileNameDescription = 'fileNameDescription',
  DocumentType = 'documentType',
  ExpenseType = 'expenseType',
  Vehicle = 'vehicle',
  Office = 'office',
  PeriodStartDate = 'periodStartDate',
  PeriodEndDate = 'periodEndDate',
  DocumentNumber = 'documentNumber',
  Price = 'price',
  ValueAddedTax = 'valueAddedTax',
  TaxBase = 'taxBase',
  PaymentType = 'paymentType',
  PaymentDate = 'paymentDate',
  CounterpartyName = 'counterpartyName',
  CounterpartyBulstat = 'counterpartyBulstat',
  DescriptionType = 'descriptionType',
  Description = 'description',
  Employee = 'employee',
}

export const columns: (
  onPreviewPdf: (file: string, fileName: string) => void,
  onUpdate: (data: SavedDocument) => void
) => GridColDef[] = (onPreviewPdf, onUpdate) => [
  {
    field: SavedDocumentColumns.Id,
    type: 'string',
    headerName: 'Id',
    width: 90,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.Name,
    type: 'string',
    headerName: 'Name',
    width: 400,
  },
  {
    field: SavedDocumentColumns.CreatedDateTime,
    headerName: 'Created At',
    valueFormatter: (value: Date) => format(value, 'dd/MM/yyyy HH:mm:ss'),
    type: 'dateTime',
    width: 160,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.IssuedDate,
    headerName: 'Issued Date',
    type: 'date',
    valueFormatter: (value: Date) =>
      value ? format(value, 'dd/MM/yyyy') : 'N/A',
    width: 160,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.FileNameDescription,
    headerName: 'File Name/Description',
    type: 'string',
    width: 200,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.DocumentType,
    headerName: 'Document Type',
    type: 'string',
    width: 130,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.ExpenseType,
    headerName: 'Expense Type',
    type: 'string',
    width: 130,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.Vehicle,
    headerName: 'Vehicle',
    type: 'string',
    width: 130,
    valueFormatter: (value: string) => (value ? value : 'N/A'),
    resizable: false,
  },
  {
    field: SavedDocumentColumns.Office,
    headerName: 'Office',
    type: 'string',
    width: 130,
    valueFormatter: (value: string) => (value ? value : 'N/A'),
    resizable: false,
  },
  {
    field: SavedDocumentColumns.Employee,
    headerName: 'Personnel',
    type: 'string',
    width: 130,
    valueFormatter: (value: string) => (value ? value : 'N/A'),
    resizable: false,
  },
  {
    field: SavedDocumentColumns.PeriodStartDate,
    headerName: 'Period Start',
    type: 'date',
    valueFormatter: (value: Date) =>
      value ? format(value, 'dd/MM/yyyy') : 'N/A',
    width: 160,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.PeriodEndDate,
    headerName: 'Period End',
    type: 'date',
    valueFormatter: (value: Date) =>
      value ? format(value, 'dd/MM/yyyy') : 'N/A',
    width: 160,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.DocumentNumber,
    headerName: 'Document Number',
    type: 'string',
    width: 160,
    valueFormatter: (value: string) => (value ? value : 'N/A'),
    resizable: false,
  },
  {
    field: SavedDocumentColumns.Price,
    headerName: 'Price',
    type: 'number',
    width: 130,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.ValueAddedTax,
    headerName: 'VAT',
    type: 'number',
    width: 130,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.TaxBase,
    headerName: 'Tax Base',
    type: 'number',
    width: 130,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.PaymentType,
    headerName: 'Payment Type',
    type: 'string',
    width: 130,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.PaymentDate,
    headerName: 'Payment Date',
    type: 'date',
    valueFormatter: (value: Date) =>
      value ? format(value, 'dd/MM/yyyy') : 'N/A',
    width: 160,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.CounterpartyName,
    headerName: 'Counterparty Name',
    type: 'string',
    width: 200,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.CounterpartyBulstat,
    headerName: 'Counterparty Bulstat',
    type: 'string',
    width: 200,
    valueFormatter: (value: string) => (value ? value : 'N/A'),
    resizable: false,
  },
  {
    field: SavedDocumentColumns.DescriptionType,
    headerName: 'Description Type',
    type: 'string',
    width: 160,
    resizable: false,
  },
  {
    field: SavedDocumentColumns.Description,
    headerName: 'Description',
    type: 'string',
    width: 160,
    valueFormatter: (value: string) => (value ? value : 'N/A'),
    resizable: false,
  },
  {
    field: SavedDocumentColumns.Action,
    type: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    resizable: false,
    renderCell: (params: GridRenderCellParams<SavedDocument>) => (
      <Box display="flex" justifyContent="space-between" width="100%" gap={1}>
        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          onClick={() => {
            const {
              row: { file, name },
            } = params
            if (!file) {
              return
            }

            onPreviewPdf(file, name)
          }}
        >
          Preview
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            const { row } = params

            onUpdate(row)
          }}
        >
          <EditOutlined />
        </Button>
      </Box>
    ),
    width: 200,
  },
]
