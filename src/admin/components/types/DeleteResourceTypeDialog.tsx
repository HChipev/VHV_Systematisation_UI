import * as React from 'react'

// COMPONENTS
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material'

// ICONS
import { Close } from '@mui/icons-material'

// TYPES & CONSTANTS
import { ResourceType } from 'src/documents/types'

interface Props {
  isOpen: boolean
  resourceName: string
  resource: ResourceType
  onClose: () => void
  onDelete: (id: number) => void
}

export const DeleteResourceTypeDialog: React.FC<Props> = ({
  isOpen,
  resourceName,
  resource,
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete(resource.id)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between">
        <DialogTitle>Delete {resourceName}</DialogTitle>

        <IconButton onClick={onClose} color="error">
          <Close />
        </IconButton>
      </Box>

      <DialogContent>
        <Typography variant="body2" color="error">
          {`Are you sure you want to delete this ${resourceName}:
          ${resource.name}(${resource.description})`}
          ?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          onClick={() => handleDelete()}
          color="primary"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
