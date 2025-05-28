import * as React from 'react'
import { enqueueSnackbar } from 'notistack'

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
import { User } from 'src/shared/types'

interface Props {
  isOpen: boolean
  user: Partial<User>
  onClose: () => void
  onDelete: (id: number) => void
}

export const DeleteUserDialog: React.FC<Props> = ({
  isOpen,
  user,
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    if (!user.id) {
      enqueueSnackbar('User Id is required for deletion', {
        variant: 'error',
      })

      return
    }

    onDelete(user.id)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between">
        <DialogTitle>Delete User</DialogTitle>

        <IconButton onClick={onClose} color="error">
          <Close />
        </IconButton>
      </Box>

      <DialogContent>
        <Typography variant="body2" color="error">
          Are you sure you want to delete this User:
          {user.email}?
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
