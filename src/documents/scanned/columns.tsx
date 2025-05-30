// COMPONENTS
import { Box, Button } from '@mui/material'

// ICONS
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import SaveIcon from '@mui/icons-material/Save'

// TYPES & CONSTANTS
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models'
import { ScannedDocument } from 'src/documents/types'
import { format } from 'date-fns'

enum ScannedDocumentColumns {
  Id = 'id',
  Name = 'name',
  CreatedDateTime = 'createdDateTime',
  Action = 'action',
}

export const columns: (
  onPreviewPdf: (file: string, fileName: string) => void,
  onSaveFile: (id: number) => void
) => GridColDef[] = (onPreviewPdf, onSaveFile) => [
  {
    field: ScannedDocumentColumns.Id,
    type: 'string',
    headerName: 'Id',
    width: 90,
    resizable: false,
  },
  {
    field: ScannedDocumentColumns.Name,
    type: 'string',
    headerName: 'Name',
    flex: 1,
    resizable: false,
  },
  {
    field: ScannedDocumentColumns.CreatedDateTime,
    headerName: 'Created At',
    valueFormatter: (value: Date) => format(value, 'dd/MM/yyyy HH:mm:ss'),
    type: 'dateTime',
    flex: 1,
    resizable: false,
  },
  {
    field: ScannedDocumentColumns.Action,
    type: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    resizable: false,
    renderCell: (params: GridRenderCellParams<ScannedDocument>) => (
      <Box display="flex" justifyContent="space-between" width="100%" gap={1}>
        <Button
          fullWidth
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
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={() => {
            const {
              row: { id },
            } = params

            onSaveFile(Number(id))
          }}
        >
          Save
        </Button>
      </Box>
    ),
    width: 300,
  },
]
