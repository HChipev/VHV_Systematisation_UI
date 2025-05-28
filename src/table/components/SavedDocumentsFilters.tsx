import * as React from 'react'
import { format } from 'date-fns'

// UTILS
import {
  useDescriptionTypes,
  useDocumentTypes,
  useExpenseTypes,
  useOffices,
  usePaymentTypes,
  useVehicles,
} from 'src/shared/queries'

// COMPONENTS
import {
  Box,
  TextField,
  Button,
  useTheme,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

// TYPES & CONSTANTS
import { SavedDocumentFilters } from 'src/documents/types'

interface Props {
  onFilter: (filters: SavedDocumentFilters) => void
  filters: SavedDocumentFilters
}

export const SavedDocumentsFilters: React.FC<Props> = ({
  onFilter,
  filters,
}) => {
  const theme = useTheme()

  const { data: documentTypes } = useDocumentTypes()
  const { data: descriptionTypes } = useDescriptionTypes()
  const { data: expenseTypes } = useExpenseTypes()
  const { data: paymentTypes } = usePaymentTypes()
  const { data: vehicles } = useVehicles()
  const { data: offices } = useOffices()

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

  const [startCreatedDateTime, setStartCreatedDateTime] =
    React.useState<Date | null>(filters?.startCreatedDateTime ?? null)
  const [endCreatedDateTime, setEndCreatedDateTime] =
    React.useState<Date | null>(filters?.endCreatedDateTime ?? null)
  const [startIssuedDate, setStartIssuedDate] = React.useState<Date | null>(
    filters?.startIssuedDate ?? null
  )
  const [endIssuedDate, setEndIssuedDate] = React.useState<Date | null>(
    filters?.endIssuedDate ?? null
  )
  const [fileNameDescription, setFileNameDescription] = React.useState<
    string | null
  >(filters?.fileNameDescription ?? null)
  const [documentType, setDocumentType] = React.useState<string | null>(
    filters?.documentType ?? null
  )
  const [expenseType, setExpenseType] = React.useState<string | null>(
    filters?.expenseType ?? null
  )
  const [vehicle, setVehicle] = React.useState<string | null>(
    filters?.vehicle ?? null
  )
  const [office, setOffice] = React.useState<string | null>(
    filters?.office ?? null
  )
  const [startPeriodStartDate, setStartPeriodStartDate] =
    React.useState<Date | null>(filters?.startPeriodStartDate ?? null)
  const [endPeriodStartDate, setEndPeriodStartDate] =
    React.useState<Date | null>(filters?.endPeriodStartDate ?? null)
  const [startPeriodEndDate, setStartPeriodEndDate] =
    React.useState<Date | null>(filters?.startPeriodEndDate ?? null)
  const [endPeriodEndDate, setEndPeriodEndDate] = React.useState<Date | null>(
    filters?.endPeriodEndDate ?? null
  )
  const [documentNumber, setDocumentNumber] = React.useState<string | null>(
    filters?.documentNumber ?? null
  )
  const [minPrice, setMinPrice] = React.useState<number | null>(
    filters?.minPrice ?? null
  )
  const [maxPrice, setMaxPrice] = React.useState<number | null>(
    filters?.maxPrice ?? null
  )
  const [paymentType, setPaymentType] = React.useState<string | null>(
    filters?.paymentType ?? null
  )
  const [startPaymentDate, setStartPaymentDate] = React.useState<Date | null>(
    filters?.startPaymentDate ?? null
  )
  const [endPaymentDate, setEndPaymentDate] = React.useState<Date | null>(
    filters?.endPaymentDate ?? null
  )
  const [counterpartyName, setCounterpartyName] = React.useState<string | null>(
    filters?.counterpartyName ?? null
  )
  const [counterpartyBulstat, setCounterpartyBulstat] = React.useState<
    string | null
  >(filters?.counterpartyBulstat ?? null)
  const [descriptionType, setDescriptionType] = React.useState<string | null>(
    filters?.descriptionType ?? null
  )
  const [description, setDescription] = React.useState<string | null>(
    filters?.description ?? null
  )
  const handleFilter = () => {
    onFilter({
      startCreatedDateTime: startCreatedDateTime ?? undefined,
      endCreatedDateTime: endCreatedDateTime ?? undefined,
      startIssuedDate: startIssuedDate ?? undefined,
      endIssuedDate: endIssuedDate ?? undefined,
      fileNameDescription: fileNameDescription ?? undefined,
      documentType: documentType ?? undefined,
      expenseType: expenseType ?? undefined,
      vehicle: vehicle ?? undefined,
      office: office ?? undefined,
      startPeriodStartDate: startPeriodStartDate ?? undefined,
      endPeriodStartDate: endPeriodStartDate ?? undefined,
      startPeriodEndDate: startPeriodEndDate ?? undefined,
      endPeriodEndDate: endPeriodEndDate ?? undefined,
      documentNumber: documentNumber ?? undefined,
      minPrice: minPrice ?? undefined,
      maxPrice: maxPrice ?? undefined,
      paymentType: paymentType ?? undefined,
      startPaymentDate: startPaymentDate ?? undefined,
      endPaymentDate: endPaymentDate ?? undefined,
      counterpartyName: counterpartyName ?? undefined,
      counterpartyBulstat: counterpartyBulstat ?? undefined,
      descriptionType: descriptionType ?? undefined,
      description: description ?? undefined,
    })
  }

  const handleReset = () => {
    onFilter({})
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={theme.spacing(1)}
      gap={theme.spacing(2)}
      height="100%"
      width="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Created Date Time</Typography>

        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          gap={theme.spacing(1)}
        >
          <DatePicker
            label="Start Date"
            value={startCreatedDateTime}
            onChange={(value) =>
              setStartCreatedDateTime(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />

          <DatePicker
            label="End Date"
            value={endCreatedDateTime}
            onChange={(value) =>
              setEndCreatedDateTime(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Issued Date</Typography>

        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          gap={theme.spacing(1)}
        >
          <DatePicker
            label="Start Issued Date"
            value={startIssuedDate}
            onChange={(value) =>
              setStartIssuedDate(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />

          <DatePicker
            label="End Issued Date"
            value={endIssuedDate}
            onChange={(value) =>
              setEndIssuedDate(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">File Name/Description</Typography>

        <TextField
          value={fileNameDescription ?? ''}
          label="File Name/Description"
          fullWidth
          margin="none"
          onChange={(e) => setFileNameDescription(e.target.value)}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Document Type</Typography>

        <FormControl fullWidth>
          <InputLabel id="document-type-label">Document Type</InputLabel>

          <Select
            labelId="document-type-label"
            name="documentTypeId"
            value={documentType}
            label="Document Type"
            onChange={(e) => setDocumentType(e.target.value)}
          >
            {documentTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {`${option.label}(${option.description})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Expense Type</Typography>

        <FormControl fullWidth>
          <InputLabel id="document-type-label">Expense Type</InputLabel>

          <Select
            labelId="expense-type-label"
            name="expenseTypeId"
            value={expenseType}
            label="Expense Type"
            onChange={(e) => setExpenseType(e.target.value)}
          >
            {expenseTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {`${option.label}(${option.description})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Vehicle</Typography>

        <FormControl fullWidth>
          <InputLabel id="vehicle-label">Vehicle</InputLabel>

          <Select
            labelId="vehicle-label"
            name="vehicleId"
            value={vehicle}
            label="Vehicle"
            onChange={(e) => setVehicle(e.target.value)}
          >
            {vehicleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {`${option.label}(${option.description})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Office</Typography>

        <FormControl fullWidth>
          <InputLabel id="office-label">Office</InputLabel>

          <Select
            labelId="office-label"
            name="officeId"
            value={office}
            label="Office"
            onChange={(e) => setOffice(e.target.value)}
          >
            {officeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {`${option.label}(${option.description})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Period Start Date</Typography>

        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          gap={theme.spacing(1)}
        >
          <DatePicker
            label="Start Period Start Date"
            value={startPeriodStartDate}
            onChange={(value) =>
              setStartPeriodStartDate(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />

          <DatePicker
            label="End Period Start Date"
            value={endPeriodStartDate}
            onChange={(value) =>
              setEndPeriodStartDate(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Period End Date</Typography>

        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          gap={theme.spacing(1)}
        >
          <DatePicker
            label="Start Period End Date"
            value={startPeriodEndDate}
            onChange={(value) =>
              setStartPeriodEndDate(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />

          <DatePicker
            label="End Period End Date"
            value={endPeriodEndDate}
            onChange={(value) =>
              setEndPeriodEndDate(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Document Number</Typography>

        <TextField
          value={documentNumber ?? ''}
          label="Document Number"
          fullWidth
          margin="none"
          onChange={(e) => setDocumentNumber(e.target.value)}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Price</Typography>

        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          gap={theme.spacing(1)}
        >
          <TextField
            type="number"
            value={minPrice ?? ''}
            label="Min Price"
            fullWidth
            margin="none"
            onChange={(e) =>
              setMinPrice(e.target.value === '' ? null : Number(e.target.value))
            }
          />

          <TextField
            type="number"
            value={maxPrice ?? ''}
            label="Max Price"
            fullWidth
            margin="none"
            onChange={(e) =>
              setMaxPrice(e.target.value === '' ? null : Number(e.target.value))
            }
          />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Payment Type</Typography>

        <FormControl fullWidth>
          <InputLabel id="payment-type-label">Payment Type</InputLabel>

          <Select
            labelId="payment-type-label"
            name="paymentTypeId"
            value={paymentType}
            label="Payment Type"
            onChange={(e) => setPaymentType(e.target.value)}
          >
            {paymentTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {`${option.label}(${option.description})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Payment Date</Typography>

        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          gap={theme.spacing(1)}
        >
          <DatePicker
            label="Start Payment Date"
            value={startPaymentDate}
            onChange={(value) =>
              setStartPaymentDate(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />

          <DatePicker
            label="End Payment Date"
            value={endPaymentDate}
            onChange={(value) =>
              setEndPaymentDate(
                value ? new Date(format(value, 'yyyy-MM-dd')) : null
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Counterparty Name</Typography>

        <TextField
          value={counterpartyName ?? ''}
          label="Counterparty Name"
          fullWidth
          margin="none"
          onChange={(e) => setCounterpartyName(e.target.value)}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Counterparty Bulstat</Typography>

        <TextField
          value={counterpartyBulstat ?? ''}
          label="Counterparty Bulstat"
          fullWidth
          margin="none"
          onChange={(e) => setCounterpartyBulstat(e.target.value)}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Description Type</Typography>

        <FormControl fullWidth>
          <InputLabel id="description-type-label">Description Type</InputLabel>

          <Select
            labelId="description-type-label"
            name="descriptionTypeId"
            value={descriptionType}
            label="Description Type"
            onChange={(e) => setDescriptionType(e.target.value)}
          >
            {descriptionTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {`${option.label}(${option.description})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={theme.spacing(1)}
      >
        <Typography variant="body2">Description</Typography>

        <TextField
          value={description ?? ''}
          label="Description"
          fullWidth
          margin="none"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" width="100%">
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>

        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Box>
    </Box>
  )
}
