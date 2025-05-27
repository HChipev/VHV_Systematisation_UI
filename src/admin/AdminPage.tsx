import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// SELECTORS
import { getUserRoles } from 'src/shared/userSelectors'

// COMPONENTS
import { Box, Tabs, Tab, useTheme } from '@mui/material'
import { UsersTable } from 'src/admin/components/users/UsersTable'
import { ResourceTypeTable } from 'src/admin/components/types/ResourceTypeTable'

// TYPES & CONSTANTS
import { AdminTabs } from 'src/admin/types'
import { Roles } from 'src/shared/types'
import { ROUTES } from 'src/shared/routes'
import {
  usePaginatedDescriptionTypes,
  usePaginatedDocumentTypes,
  usePaginatedExpenseTypes,
  usePaginatedOffices,
  usePaginatedPaymentTypes,
  usePaginatedVehicles,
} from 'src/shared/queries'

export const AdminPage: React.FC = () => {
  const theme = useTheme()

  const userRoles = useSelector(getUserRoles)

  const navigate = useNavigate()

  React.useEffect(() => {
    if (!userRoles.includes(Roles.Admin)) {
      navigate(ROUTES.HOMEPAGE_ROUTE)
    }
  }, [userRoles, navigate])

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
          centered
          variant="scrollable"
          scrollButtons="auto"
          slotProps={{
            list: { style: { width: 'fit-content' } },
          }}
        >
          {Object.values(AdminTabs).map((tabValue) => (
            <Tab key={tabValue} value={tabValue} label={tabValue} />
          ))}
        </Tabs>
      </Box>

      <Box height="95%" display="flex" width="100%">
        {tab === AdminTabs.Users && <UsersTable />}

        {tab === AdminTabs.DocumentTypes && (
          <ResourceTypeTable
            useQuery={usePaginatedDocumentTypes}
            tableHeader="Document Types"
          />
        )}

        {tab === AdminTabs.DescriptionTypes && (
          <ResourceTypeTable
            useQuery={usePaginatedDescriptionTypes}
            tableHeader="Description Types"
          />
        )}

        {tab === AdminTabs.ExpenseTypes && (
          <ResourceTypeTable
            useQuery={usePaginatedExpenseTypes}
            tableHeader="Expense Types"
          />
        )}

        {tab === AdminTabs.Offices && (
          <ResourceTypeTable
            useQuery={usePaginatedOffices}
            tableHeader="Offices"
          />
        )}

        {tab === AdminTabs.Vehicles && (
          <ResourceTypeTable
            useQuery={usePaginatedVehicles}
            tableHeader="Vehicles"
          />
        )}

        {tab === AdminTabs.PaymentTypes && (
          <ResourceTypeTable
            useQuery={usePaginatedPaymentTypes}
            tableHeader="Payment Types"
          />
        )}
      </Box>
    </Box>
  )
}
