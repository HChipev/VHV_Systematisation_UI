import * as React from 'react'

// COMPONENTS
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  useTheme,
} from '@mui/material'

// ICONS
import { Close } from '@mui/icons-material'

// TYPES & CONSTANTS
import { ResourceTypeModelRequest } from 'src/admin/components/types/types'
import { ResourceType } from 'src/documents/types'

interface Props {
  isOpen: boolean
  resourceName: string
  resource: ResourceType
  onClose: () => void
  onUpdate: (id: number, data: ResourceTypeModelRequest) => void
}

export const UpdateResourceTypeDialog: React.FC<Props> = ({
  isOpen,
  resourceName,
  resource,
  onClose,
  onUpdate,
}) => {
  const theme = useTheme()

  const [name, setName] = React.useState(resource.name)
  const [description, setDescription] = React.useState(resource.description)

  const handleUpdate = () => {
    onUpdate(resource.id, { name, description })
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between">
        <DialogTitle>Update {resourceName}</DialogTitle>

        <IconButton onClick={onClose} color="error">
          <Close />
        </IconButton>
      </Box>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={theme.spacing(3)}>
          <TextField
            label="Name"
            value={name}
            fullWidth
            margin="none"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="Description"
            value={description}
            fullWidth
            margin="none"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          onClick={() => handleUpdate()}
          color="primary"
          variant="contained"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}
