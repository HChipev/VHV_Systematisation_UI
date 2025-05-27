// COMPONENTS

// ICONS

// TYPES & CONSTANTS
import { GridColDef } from '@mui/x-data-grid/models'

enum ResourceType {
  Id = 'id',
  Name = 'name',
  Description = 'description',
  Actions = 'actions',
}

export const columns: GridColDef[] = [
  {
    field: ResourceType.Id,
    type: 'string',
    headerName: 'Id',
    width: 90,
    resizable: false,
  },
  {
    field: ResourceType.Name,
    type: 'string',
    headerName: 'Name',
    flex: 1,
    resizable: false,
  },
  {
    field: ResourceType.Description,
    type: 'string',
    headerName: 'Roles',
    flex: 1,
    resizable: false,
  },
  {
    field: ResourceType.Actions,
    type: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    resizable: false,
    renderCell: () => (
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
