import * as React from 'react'
import { enqueueSnackbar } from 'notistack'
import { format } from 'date-fns'

// UTILS
import {
  useDocumentTypes,
  useDescriptionTypes,
  useExpenseTypes,
  useOffices,
  usePaymentTypes,
  useVehicles,
} from 'src/shared/queries'

// COMPONENTS
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  useTheme,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

// ICONS
import CloseIcon from '@mui/icons-material/Close'

// TYPES & CONSTANTS
import { SavedDocumentRequest } from 'src/documents/types'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave: (data: SavedDocumentRequest) => void
  scannedDocumentId: number | null
}

export const SaveDocumentDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  scannedDocumentId,
}) => {
  const theme = useTheme()

  const { data: documentTypes } = useDocumentTypes()
  const { data: descriptionTypes } = useDescriptionTypes()
  const { data: expenseTypes } = useExpenseTypes()
  const { data: paymentTypes } = usePaymentTypes()
  const { data: vehicles } = useVehicles()
  const { data: offices } = useOffices()

  const documentTypeOptions = documentTypes.map((type) => ({
    label: type.name,
    value: type.id,
  }))
  const descriptionTypeOptions = descriptionTypes.map((type) => ({
    label: type.name,
    value: type.id,
  }))
  const expenseTypeOptions = expenseTypes.map((type) => ({
    label: type.name,
    value: type.id,
  }))
  const paymentTypeOptions = paymentTypes.map((type) => ({
    label: type.name,
    value: type.id,
  }))
  const vehicleOptions = vehicles.map((vehicle) => ({
    label: vehicle.name,
    value: vehicle.id,
  }))
  const officeOptions = offices.map((office) => ({
    label: office.name,
    value: office.id,
  }))

  const [form, setForm] = React.useState<Partial<SavedDocumentRequest>>({})
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof SavedDocumentRequest, boolean>>
  >({})

  React.useEffect(() => {
    setForm((prev) => ({
      ...prev,
      scannedDocumentId: scannedDocumentId ?? undefined,
    }))
  }, [scannedDocumentId])

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [name]: value ? Number(value) : undefined }))
  }

  const handleSubmit = () => {
    if (
      !form.documentTypeId ||
      !form.expenseTypeId ||
      !form.fileNameDescription ||
      !form.issuedDate ||
      !form.price ||
      !form.paymentTypeId ||
      !form.counterpartyName ||
      !form.descriptionTypeId
    ) {
      enqueueSnackbar('Please fill in all required fields.', {
        variant: 'warning',
      })

      setErrors({
        documentTypeId: !form.documentTypeId,
        expenseTypeId: !form.expenseTypeId,
        fileNameDescription: !form.fileNameDescription,
        issuedDate: !form.issuedDate,
        price: !form.price,
        paymentTypeId: !form.paymentTypeId,
        counterpartyName: !form.counterpartyName,
        descriptionTypeId: !form.descriptionTypeId,
      })
      return
    }

    onSave(form as SavedDocumentRequest)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <Box display="flex" justifyContent="space-between">
        <DialogTitle>Save Document</DialogTitle>

        <IconButton onClick={onClose} color="error">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={theme.spacing(3)}>
          <DatePicker
            label="Issued Date"
            value={form.issuedDate ? new Date(form.issuedDate) : null}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                issuedDate: value ? format(value, 'yyyy-MM-dd') : undefined,
              }))
            }
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                error: Boolean(errors.issuedDate),
                helperText: errors.issuedDate ? 'Required' : undefined,
              },
            }}
          />

          <TextField
            label="File Name/Description"
            name="fileNameDescription"
            fullWidth
            margin="none"
            onChange={handleChange}
            required
            error={Boolean(errors.fileNameDescription)}
            helperText={errors.fileNameDescription ? 'Required' : undefined}
          />

          <FormControl
            fullWidth
            error={Boolean(errors.documentTypeId)}
            required
          >
            <InputLabel id="document-type-label">Document Type</InputLabel>

            <Select
              labelId="document-type-label"
              name="documentTypeId"
              value={form.documentTypeId ?? ''}
              label="Document Type"
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  documentTypeId: event.target.value,
                }))
              }
            >
              {documentTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>

            {errors.documentTypeId && <FormHelperText>Required</FormHelperText>}
          </FormControl>

          <TextField
            label="Document Number"
            name="documentNumber"
            fullWidth
            margin="none"
            onChange={handleChange}
          />

          <FormControl fullWidth error={Boolean(errors.expenseTypeId)} required>
            <InputLabel id="expense-type-label">Expense Type</InputLabel>

            <Select
              labelId="expense-type-label"
              name="expenseTypeId"
              value={form.expenseTypeId ?? ''}
              label="Expense Type"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  expenseTypeId: Number(e.target.value),
                }))
              }
            >
              {expenseTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>

            {errors.expenseTypeId && <FormHelperText>Required</FormHelperText>}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="vehicle-label">Vehicle</InputLabel>

            <Select
              labelId="vehicle-label"
              name="vehicleId"
              value={form.vehicleId ?? ''}
              label="Vehicle"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  vehicleId: Number(e.target.value),
                }))
              }
            >
              {vehicleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="office-label">Office</InputLabel>

            <Select
              labelId="office-label"
              name="officeId"
              value={form.officeId ?? ''}
              label="Office"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  officeId: Number(e.target.value),
                }))
              }
            >
              {officeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DatePicker
            label="Period Start Date"
            value={form.periodStartDate ? new Date(form.periodStartDate) : null}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                periodStartDate: value
                  ? format(value, 'yyyy-MM-dd')
                  : undefined,
              }))
            }
            slotProps={{ textField: { fullWidth: true } }}
          />

          <DatePicker
            label="Period End Date"
            value={form.periodEndDate ? new Date(form.periodEndDate) : null}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                periodEndDate: value ? format(value, 'yyyy-MM-dd') : undefined,
              }))
            }
            slotProps={{ textField: { fullWidth: true } }}
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            margin="none"
            onChange={handleNumberChange}
            required
            error={Boolean(errors.price)}
            helperText={errors.price ? 'Required' : undefined}
          />

          <FormControl fullWidth error={Boolean(errors.paymentTypeId)} required>
            <InputLabel id="payment-type-label">Payment Type</InputLabel>

            <Select
              labelId="payment-type-label"
              name="paymentTypeId"
              value={form.paymentTypeId ?? ''}
              label="Payment Type"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  paymentTypeId: Number(e.target.value),
                }))
              }
            >
              {paymentTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>

            {errors.paymentTypeId && <FormHelperText>Required</FormHelperText>}
          </FormControl>

          <DatePicker
            label="Payment Date"
            value={form.paymentDate ? new Date(form.paymentDate) : null}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                paymentDate: value ? format(value, 'yyyy-MM-dd') : undefined,
              }))
            }
            slotProps={{ textField: { fullWidth: true } }}
          />

          <TextField
            label="Counterparty Name"
            name="counterpartyName"
            fullWidth
            margin="none"
            onChange={handleChange}
            required
            error={Boolean(errors.counterpartyName)}
            helperText={errors.counterpartyName ? 'Required' : undefined}
          />

          <TextField
            label="Counterparty Bulstat"
            name="counterpartyBulstat"
            fullWidth
            margin="none"
            onChange={handleChange}
          />

          <FormControl
            fullWidth
            error={Boolean(errors.descriptionTypeId)}
            required
          >
            <InputLabel id="description-type-label">
              Description Type
            </InputLabel>

            <Select
              labelId="description-type-label"
              name="descriptionTypeId"
              value={form.descriptionTypeId ?? ''}
              label="Description Type"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  descriptionTypeId: Number(e.target.value),
                }))
              }
            >
              {descriptionTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>

            {errors.descriptionTypeId && (
              <FormHelperText>Required</FormHelperText>
            )}
          </FormControl>

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            margin="none"
            onChange={handleChange}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>

        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
