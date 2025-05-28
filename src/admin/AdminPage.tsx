import * as React from 'react'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'

// UTILS
import { handleApiError } from 'src/shared/utils'
import {
  useAddDescriptionType,
  useAddDocumentType,
  useAddExpenseType,
  useAddOffice,
  useAddPaymentType,
  useAddVehicle,
  useDeleteDescriptionType,
  useDeleteDocumentType,
  useDeleteExpenseType,
  useDeleteOffice,
  useDeletePaymentType,
  useDeleteUser,
  useDeleteVehicle,
  useUpdateDescriptionType,
  useUpdateDocumentType,
  useUpdateExpenseType,
  useUpdateOffice,
  useUpdatePaymentType,
  useUpdateUser,
  useUpdateVehicle,
} from 'src/shared/mutations'

// COMPONENTS
import { Box, Tabs, Tab, useTheme } from '@mui/material'
import { UsersTable } from 'src/admin/components/users/UsersTable'
import { ResourceTypeTable } from 'src/admin/components/types/ResourceTypeTable'
import { AddResourceTypeActionComponent } from 'src/admin/components/types/AddResourceTypeActionComponent'
import { ScanPathPage } from 'src/admin/components/scan-path/ScanPathPage'

// TYPES & CONSTANTS
import { AdminTabs } from 'src/admin/types'
import {
  usePaginatedDescriptionTypes,
  usePaginatedDocumentTypes,
  usePaginatedExpenseTypes,
  usePaginatedOffices,
  usePaginatedPaymentTypes,
  usePaginatedVehicles,
} from 'src/shared/queries'
import {
  PAGINATED_DESCRIPTION_TYPES_QUERY_KEY,
  PAGINATED_DOCUMENT_TYPES_QUERY_KEY,
  PAGINATED_EXPENSE_TYPES_QUERY_KEY,
  PAGINATED_OFFICES_QUERY_KEY,
  PAGINATED_PAYMENT_TYPES_QUERY_KEY,
  PAGINATED_VEHICLES_QUERY_KEY,
  USERS_QUERY_KEY,
} from 'src/shared/queryKeys'
import { AdminTabsToTextMap } from 'src/admin/strategyMaps'

export const AdminPage: React.FC = () => {
  const queryClient = useQueryClient()

  const theme = useTheme()

  const { mutate: updateDocumentType } = useUpdateDocumentType()
  const { mutate: updateDescriptionType } = useUpdateDescriptionType()
  const { mutate: updateExpenseType } = useUpdateExpenseType()
  const { mutate: updateOffice } = useUpdateOffice()
  const { mutate: updateVehicle } = useUpdateVehicle()
  const { mutate: updatePaymentType } = useUpdatePaymentType()

  const { mutate: deleteDocumentType } = useDeleteDocumentType()
  const { mutate: deleteDescriptionType } = useDeleteDescriptionType()
  const { mutate: deleteExpenseType } = useDeleteExpenseType()
  const { mutate: deleteOffice } = useDeleteOffice()
  const { mutate: deleteVehicle } = useDeleteVehicle()
  const { mutate: deletePaymentType } = useDeletePaymentType()

  const { mutate: updateUser } = useUpdateUser()
  const { mutate: deleteUser } = useDeleteUser()

  const [tab, setTab] = React.useState(AdminTabs.Users)

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      width="100%"
      padding={theme.spacing(3)}
      gap={theme.spacing(2)}
    >
      <Box display="flex" maxWidth="100%">
        <Tabs
          value={tab}
          onChange={(_, value: AdminTabs) => {
            setTab(value)
          }}
          variant="scrollable"
          scrollButtons="auto"
          slotProps={{
            list: { style: { width: 'fit-content' } },
          }}
        >
          {Object.values(AdminTabs).map((tabValue) => (
            <Tab
              key={tabValue}
              value={tabValue}
              label={AdminTabsToTextMap[tabValue]}
            />
          ))}
        </Tabs>
      </Box>

      <Box height="95%" display="flex" width="100%">
        {tab === AdminTabs.Users && (
          <UsersTable
            onUpdate={(id, data, onSuccess) => {
              updateUser(
                { id, data },
                {
                  onSuccess() {
                    queryClient.invalidateQueries({
                      queryKey: [USERS_QUERY_KEY],
                    })

                    onSuccess()

                    enqueueSnackbar('User updated successfully', {
                      variant: 'success',
                    })
                  },
                  onError: handleApiError,
                }
              )
            }}
            onDelete={(id, onSuccess) => {
              deleteUser(id, {
                onSuccess() {
                  queryClient.invalidateQueries({
                    queryKey: [USERS_QUERY_KEY],
                  })

                  onSuccess()

                  enqueueSnackbar('User deleted successfully', {
                    variant: 'success',
                  })
                },
                onError: handleApiError,
              })
            }}
          />
        )}

        {tab === AdminTabs.DocumentTypes && (
          <ResourceTypeTable
            useQuery={usePaginatedDocumentTypes}
            tableHeader="Document Types"
            genericHeaderActionComponent={
              <AddResourceTypeActionComponent
                resourceName="Document Type"
                useMutation={useAddDocumentType}
                queryKey={PAGINATED_DOCUMENT_TYPES_QUERY_KEY}
              />
            }
            resourceName="Document Type"
            onUpdate={(id, data, onSuccess) => {
              updateDocumentType(
                { id, data },
                {
                  onSuccess() {
                    queryClient.invalidateQueries({
                      queryKey: [PAGINATED_DOCUMENT_TYPES_QUERY_KEY],
                    })

                    onSuccess()

                    enqueueSnackbar('Document Type updated successfully', {
                      variant: 'success',
                    })
                  },
                  onError: handleApiError,
                }
              )
            }}
            onDelete={(id, onSuccess) => {
              deleteDocumentType(id, {
                onSuccess() {
                  queryClient.invalidateQueries({
                    queryKey: [PAGINATED_DOCUMENT_TYPES_QUERY_KEY],
                  })

                  enqueueSnackbar('Document Type deleted successfully', {
                    variant: 'success',
                  })

                  onSuccess()
                },
                onError: handleApiError,
              })
            }}
          />
        )}

        {tab === AdminTabs.DescriptionTypes && (
          <ResourceTypeTable
            useQuery={usePaginatedDescriptionTypes}
            tableHeader="Description Types"
            genericHeaderActionComponent={
              <AddResourceTypeActionComponent
                resourceName="Description Type"
                useMutation={useAddDescriptionType}
                queryKey={PAGINATED_DESCRIPTION_TYPES_QUERY_KEY}
              />
            }
            resourceName="Description Type"
            onUpdate={(id, data, onSuccess) => {
              updateDescriptionType(
                { id, data },
                {
                  onSuccess() {
                    queryClient.invalidateQueries({
                      queryKey: [PAGINATED_DESCRIPTION_TYPES_QUERY_KEY],
                    })

                    enqueueSnackbar('Description Type updated successfully', {
                      variant: 'success',
                    })

                    onSuccess()
                  },
                  onError: handleApiError,
                }
              )
            }}
            onDelete={(id, onSuccess) => {
              deleteDescriptionType(id, {
                onSuccess() {
                  queryClient.invalidateQueries({
                    queryKey: [PAGINATED_DESCRIPTION_TYPES_QUERY_KEY],
                  })

                  enqueueSnackbar('Description Type deleted successfully', {
                    variant: 'success',
                  })

                  onSuccess()
                },
                onError: handleApiError,
              })
            }}
          />
        )}

        {tab === AdminTabs.ExpenseTypes && (
          <ResourceTypeTable
            useQuery={usePaginatedExpenseTypes}
            tableHeader="Expense Types"
            genericHeaderActionComponent={
              <AddResourceTypeActionComponent
                resourceName="Expense Type"
                useMutation={useAddExpenseType}
                queryKey={PAGINATED_EXPENSE_TYPES_QUERY_KEY}
              />
            }
            resourceName="Expense Type"
            onUpdate={(id, data, onSuccess) => {
              updateExpenseType(
                { id, data },
                {
                  onSuccess() {
                    queryClient.invalidateQueries({
                      queryKey: [PAGINATED_EXPENSE_TYPES_QUERY_KEY],
                    })

                    enqueueSnackbar('Expense Type updated successfully', {
                      variant: 'success',
                    })

                    onSuccess()
                  },
                  onError: handleApiError,
                }
              )
            }}
            onDelete={(id, onSuccess) => {
              deleteExpenseType(id, {
                onSuccess() {
                  queryClient.invalidateQueries({
                    queryKey: [PAGINATED_EXPENSE_TYPES_QUERY_KEY],
                  })

                  enqueueSnackbar('Expense Type deleted successfully', {
                    variant: 'success',
                  })

                  onSuccess()
                },
                onError: handleApiError,
              })
            }}
          />
        )}

        {tab === AdminTabs.Offices && (
          <ResourceTypeTable
            useQuery={usePaginatedOffices}
            tableHeader="Offices"
            genericHeaderActionComponent={
              <AddResourceTypeActionComponent
                resourceName="Office"
                useMutation={useAddOffice}
                queryKey={PAGINATED_OFFICES_QUERY_KEY}
              />
            }
            resourceName="Office"
            onUpdate={(id, data, onSuccess) => {
              updateOffice(
                { id, data },
                {
                  onSuccess() {
                    queryClient.invalidateQueries({
                      queryKey: [PAGINATED_OFFICES_QUERY_KEY],
                    })

                    enqueueSnackbar('Office updated successfully', {
                      variant: 'success',
                    })

                    onSuccess()
                  },
                  onError: handleApiError,
                }
              )
            }}
            onDelete={(id, onSuccess) => {
              deleteOffice(id, {
                onSuccess() {
                  queryClient.invalidateQueries({
                    queryKey: [PAGINATED_OFFICES_QUERY_KEY],
                  })

                  enqueueSnackbar('Office deleted successfully', {
                    variant: 'success',
                  })

                  onSuccess()
                },
                onError: handleApiError,
              })
            }}
          />
        )}

        {tab === AdminTabs.Vehicles && (
          <ResourceTypeTable
            useQuery={usePaginatedVehicles}
            tableHeader="Vehicles"
            genericHeaderActionComponent={
              <AddResourceTypeActionComponent
                resourceName="Vehicle"
                useMutation={useAddVehicle}
                queryKey={PAGINATED_VEHICLES_QUERY_KEY}
              />
            }
            resourceName="Vehicle"
            onUpdate={(id, data, onSuccess) => {
              updateVehicle(
                { id, data },
                {
                  onSuccess() {
                    queryClient.invalidateQueries({
                      queryKey: [PAGINATED_VEHICLES_QUERY_KEY],
                    })

                    enqueueSnackbar('Vehicle updated successfully', {
                      variant: 'success',
                    })

                    onSuccess()
                  },
                  onError: handleApiError,
                }
              )
            }}
            onDelete={(id, onSuccess) => {
              deleteVehicle(id, {
                onSuccess() {
                  queryClient.invalidateQueries({
                    queryKey: [PAGINATED_VEHICLES_QUERY_KEY],
                  })

                  enqueueSnackbar('Vehicle deleted successfully', {
                    variant: 'success',
                  })

                  onSuccess()
                },
                onError: handleApiError,
              })
            }}
          />
        )}

        {tab === AdminTabs.PaymentTypes && (
          <ResourceTypeTable
            useQuery={usePaginatedPaymentTypes}
            tableHeader="Payment Types"
            genericHeaderActionComponent={
              <AddResourceTypeActionComponent
                resourceName="Payment Type"
                useMutation={useAddPaymentType}
                queryKey={PAGINATED_PAYMENT_TYPES_QUERY_KEY}
              />
            }
            resourceName="Payment Type"
            onUpdate={(id, data, onSuccess) => {
              updatePaymentType(
                { id, data },
                {
                  onSuccess() {
                    queryClient.invalidateQueries({
                      queryKey: [PAGINATED_PAYMENT_TYPES_QUERY_KEY],
                    })

                    enqueueSnackbar('Payment Type updated successfully', {
                      variant: 'success',
                    })

                    onSuccess()
                  },
                  onError: handleApiError,
                }
              )
            }}
            onDelete={(id, onSuccess) => {
              deletePaymentType(id, {
                onSuccess() {
                  queryClient.invalidateQueries({
                    queryKey: [PAGINATED_PAYMENT_TYPES_QUERY_KEY],
                  })

                  enqueueSnackbar('Payment Type deleted successfully', {
                    variant: 'success',
                  })

                  onSuccess()
                },
                onError: handleApiError,
              })
            }}
          />
        )}

        {tab === AdminTabs.ScanPath && <ScanPathPage />}
      </Box>
    </Box>
  )
}
