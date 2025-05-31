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
  useEmployees,
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
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

// ICONS
import CloseIcon from '@mui/icons-material/Close'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

// TYPES & CONSTANTS
import { DocumentRequest } from 'src/documents/types'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave: (data: DocumentRequest) => void
  file: string | null
  fileName: string | null
  onPreview: (file: string | null, fileName: string | null) => void
  scannedDocumentId: number | null
}

export const SaveDocumentDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  file,
  fileName,
  onPreview,
  scannedDocumentId,
}) => {
  const theme = useTheme()

  const { data: documentTypes } = useDocumentTypes()
  const { data: descriptionTypes } = useDescriptionTypes()
  const { data: expenseTypes } = useExpenseTypes()
  const { data: paymentTypes } = usePaymentTypes()
  const { data: vehicles } = useVehicles()
  const { data: offices } = useOffices()
  const { data: employees } = useEmployees()

  const documentTypeOptions =
    documentTypes?.map((type) => ({
      label: type.name,
      value: type.id,
      description: type.description,
    })) ?? []
  const descriptionTypeOptions =
    descriptionTypes?.map((type) => ({
      label: type.name,
      value: type.id,
      description: type.description,
    })) ?? []
  const expenseTypeOptions =
    expenseTypes?.map((type) => ({
      label: type.name,
      value: type.id,
      description: type.description,
    })) ?? []
  const paymentTypeOptions =
    paymentTypes?.map((type) => ({
      label: type.name,
      value: type.id,
      description: type.description,
    })) ?? []
  const employeeOptions =
    employees?.map((employee) => ({
      label: employee.name,
      value: employee.id,
      description: employee.description,
    })) ?? []
  const vehicleOptions =
    vehicles?.map((vehicle) => ({
      label: vehicle.name,
      value: vehicle.id,
      description: vehicle.description,
    })) ?? []
  const officeOptions =
    offices?.map((office) => ({
      label: office.name,
      value: office.id,
      description: office.description,
    })) ?? []

  const [form, setForm] = React.useState<Partial<DocumentRequest>>({})
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof DocumentRequest, boolean>>
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

    onSave(form as DocumentRequest)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{ paper: { style: { overflowX: 'hidden' } } }}
    >
      <Box display="flex" justifyContent="space-between">
        <DialogTitle gap={theme.spacing(1)} display="flex" alignItems="center">
          Save Document
          <Button
            variant="contained"
            size="small"
            disabled={!file}
            onClick={() => onPreview(file, fileName)}
          >
            <Box
              component="span"
              display="flex"
              alignItems="center"
              gap={theme.spacing(0.5)}
            >
              <Typography variant="body2">Preview</Typography>

              <PictureAsPdfIcon />
            </Box>
          </Button>
        </DialogTitle>

        <IconButton onClick={onClose} color="error">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={theme.spacing(3)}>
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
                  {`${option.label}(${option.description})`}
                </MenuItem>
              ))}
            </Select>

            <Box display="flex" justifyContent="end" width="100%">
              <Button
                size="small"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    expenseTypeId: undefined,
                  }))
                }
              >
                Reset
              </Button>
            </Box>

            {errors.expenseTypeId && <FormHelperText>Required</FormHelperText>}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="personnel-label">Personnel</InputLabel>

            <Select
              disabled={Boolean(form.vehicleId || form.officeId)}
              labelId="personnel-label"
              name="employeeId"
              value={form.employeeId ?? ''}
              label="Personnel"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  employeeId: Number(e.target.value),
                }))
              }
            >
              {employeeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {`${option.label}(${option.description})`}
                </MenuItem>
              ))}
            </Select>

            <Box display="flex" justifyContent="end" width="100%">
              <Button
                disabled={Boolean(form.officeId || form.vehicleId)}
                size="small"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    employeeId: undefined,
                  }))
                }
              >
                Reset
              </Button>
            </Box>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="vehicle-label">Vehicle</InputLabel>

            <Select
              disabled={Boolean(form.officeId || form.employeeId)}
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
                  {`${option.label}(${option.description})`}
                </MenuItem>
              ))}
            </Select>

            <Box display="flex" justifyContent="end" width="100%">
              <Button
                disabled={Boolean(form.officeId || form.employeeId)}
                size="small"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    vehicleId: undefined,
                  }))
                }
              >
                Reset
              </Button>
            </Box>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="office-label">Office</InputLabel>

            <Select
              disabled={Boolean(form.vehicleId || form.employeeId)}
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
                  {`${option.label}(${option.description})`}
                </MenuItem>
              ))}
            </Select>

            <Box display="flex" justifyContent="end" width="100%">
              <Button
                disabled={Boolean(form.vehicleId || form.employeeId)}
                size="small"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    officeId: undefined,
                  }))
                }
              >
                Reset
              </Button>
            </Box>
          </FormControl>

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
            label="File Name/Description"
            name="fileNameDescription"
            fullWidth
            margin="none"
            onChange={handleChange}
            required
            error={Boolean(errors.fileNameDescription)}
            helperText={errors.fileNameDescription ? 'Required' : undefined}
          />

          <DatePicker
            label="Issued Date"
            maxDate={new Date()}
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
                  {`${option.label}(${option.description})`}
                </MenuItem>
              ))}
            </Select>

            <Box display="flex" justifyContent="end" width="100%">
              <Button
                size="small"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    documentTypeId: undefined,
                  }))
                }
              >
                Reset
              </Button>
            </Box>

            {errors.documentTypeId && <FormHelperText>Required</FormHelperText>}
          </FormControl>

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
                  {`${option.label}(${option.description})`}
                </MenuItem>
              ))}
            </Select>

            <Box display="flex" justifyContent="end" width="100%">
              <Button
                size="small"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    paymentTypeId: undefined,
                  }))
                }
              >
                Reset
              </Button>
            </Box>

            {errors.paymentTypeId && <FormHelperText>Required</FormHelperText>}
          </FormControl>

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
                  {`${option.label}(${option.description})`}
                </MenuItem>
              ))}
            </Select>

            <Box display="flex" justifyContent="end" width="100%">
              <Button
                size="small"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    descriptionTypeId: undefined,
                  }))
                }
              >
                Reset
              </Button>
            </Box>

            {errors.descriptionTypeId && (
              <FormHelperText>Required</FormHelperText>
            )}
          </FormControl>

          <TextField
            label="Document Number"
            name="documentNumber"
            fullWidth
            margin="none"
            onChange={handleChange}
          />

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
            label="Counterparty Bulstat"
            name="counterpartyBulstat"
            fullWidth
            margin="none"
            onChange={handleChange}
          />

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
