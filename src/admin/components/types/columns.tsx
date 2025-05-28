// COMPONENTS
import { Box, Button } from '@mui/material'

// ICONS
import { DeleteOutline, EditOutlined } from '@mui/icons-material'

// TYPES & CONSTANTS
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models'
import { ResourceType as ResourceTypeModel } from 'src/documents/types'

enum ResourceType {
  Id = 'id',
  Name = 'name',
  Description = 'description',
  Actions = 'actions',
}

export const columns: (
  onUpdate: (id: number, name: string, description: string) => void,
  onDelete: (id: number, name: string, description: string) => void
) => GridColDef[] = (onUpdate, onDelete) => [
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
    renderCell: (params: GridRenderCellParams<ResourceTypeModel>) => (
      <Box display="flex" justifyContent="space-around" width="100%" gap={1}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            const {
              row: { id, name, description },
            } = params

            onUpdate(id, name, description)
          }}
        >
          <EditOutlined />
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            const {
              row: { id, name, description },
            } = params

            onDelete(id, name, description)
          }}
        >
          <DeleteOutline />
        </Button>
      </Box>
    ),
    width: 160,
  },
]
