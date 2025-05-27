import { format } from 'date-fns'

// COMPONENTS
import { Box, Button, Chip } from '@mui/material'

// ICONS
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import SaveIcon from '@mui/icons-material/Save'

// TYPES & CONSTANTS
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models'
import { User } from 'src/shared/types'

enum UserColumns {
  Id = 'id',
  Email = 'email',
  CreatedDateTime = 'createdDateTime',
  Roles = 'roles',
  Actions = 'actions',
}

export const columns: GridColDef[] = [
  {
    field: UserColumns.Id,
    type: 'string',
    headerName: 'Id',
    width: 90,
    resizable: false,
  },
  {
    field: UserColumns.Email,
    type: 'string',
    headerName: 'Email',
    flex: 1,
    resizable: false,
  },
  {
    field: UserColumns.CreatedDateTime,
    headerName: 'Created At',
    valueFormatter: (value: Date) => format(value, 'dd/MM/yyyy HH:mm:ss'),
    type: 'dateTime',
    flex: 1,
    resizable: false,
  },
  {
    field: UserColumns.Roles,
    type: 'string',
    headerName: 'Roles',
    flex: 1,
    resizable: false,
    renderCell: (params: GridRenderCellParams<User>) => {
      const { row } = params
      return row.roles && row.roles.length > 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          flexWrap="wrap"
          height="100%"
        >
          {row.roles.map((role: string) => (
            <Box key={role} display="inline-flex" alignItems="center">
              <Chip label={role} color="primary" variant="outlined" />
            </Box>
          ))}
        </Box>
      ) : (
        'N/A'
      )
    },
  },
  {
    field: UserColumns.Actions,
    type: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    resizable: false,
    renderCell: (params: GridRenderCellParams<User>) => (
      <></>
      // <Box display="flex" justifyContent="space-between" width="100%" gap={1}>
      //   <Button
      //     fullWidth
      //     variant="outlined"
      //     startIcon={<PictureAsPdfIcon />}
      //     onClick={() => {
      //       const {
      //         row: { file },
      //       } = params
      //       if (!file) {
      //         return
      //       }

      //       onPreviewPdf(file)
      //     }}
      //   >
      //     Preview
      //   </Button>

      //   <Button
      //     fullWidth
      //     variant="contained"
      //     color="primary"
      //     startIcon={<SaveIcon />}
      //     onClick={() => {
      //       const {
      //         row: { id },
      //       } = params

      //       onSaveFile(Number(id))
      //     }}
      //   >
      //     Save
      //   </Button>
      // </Box>
    ),
    width: 160,
  },
]
