import * as React from 'react'
import { enqueueSnackbar } from 'notistack'

// UTILS
import { handleApiError } from 'src/shared/utils'

// COMPONENTS
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  useTheme,
  IconButton,
} from '@mui/material'

// ICONS
import { AddOutlined, Close as CloseIcon } from '@mui/icons-material'

// TYPES & CONSTANTS
import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { ResourceTypeModelRequest } from 'src/admin/components/types/types'

interface Props {
  resourceName: string
  useMutation: () => UseMutationResult<
    void,
    Error,
    ResourceTypeModelRequest,
    unknown
  >
  queryKey: string
}

export const AddResourceTypeActionComponent: React.FC<Props> = ({
  resourceName,
  useMutation,
  queryKey,
}) => {
  const queryClient = useQueryClient()

  const theme = useTheme()

  const { mutate } = useMutation()

  const [isOpen, setIsOpen] = React.useState(false)
  const [form, setForm] = React.useState<Partial<ResourceTypeModelRequest>>({})
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof ResourceTypeModelRequest, boolean>>
  >({})

  const handleSubmit = (data: ResourceTypeModelRequest) => {
    if (!data.name || !data.description) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' })

      setErrors({
        name: !data.name,
        description: !data.description,
      })

      return
    }

    mutate(data, {
      onSuccess: () => {
        setForm({})
        setIsOpen(false)
        queryClient.invalidateQueries({
          queryKey: [queryKey],
        })
        enqueueSnackbar(`${resourceName} added successfully`, {
          variant: 'success',
        })
      },
      onError: handleApiError,
    })
  }

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onClose = () => {
    setIsOpen(false)
    setForm({})
    setErrors({})
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpen(true)}
        startIcon={<AddOutlined />}
        size="small"
      >
        Add {resourceName}
      </Button>

      <Dialog open={isOpen} onClose={onClose}>
        <Box display="flex" justifyContent="space-between">
          <DialogTitle>Add {resourceName}</DialogTitle>

          <IconButton onClick={onClose} color="error">
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={theme.spacing(3)}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="none"
              onChange={handleChange}
              required
              error={Boolean(errors.name)}
              helperText={errors.name ? 'Required' : undefined}
            />

            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="none"
              onChange={handleChange}
              required
              error={Boolean(errors.description)}
              helperText={errors.description ? 'Required' : undefined}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>

          <Button
            onClick={() => handleSubmit(form as ResourceTypeModelRequest)}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
