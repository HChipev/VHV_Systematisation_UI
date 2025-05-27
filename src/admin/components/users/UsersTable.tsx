import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// SELECTORS
import { getUserFilters } from 'src/admin/components/users/userFiltersSelectors'

// ACTIONS
import { actions } from 'src/admin/components/users/userFiltersActions'

// UTILS
import { useUsers } from 'src/shared/queries'
import { usePagination } from 'src/shared/utils'

// COMPONENTS
import { Table } from 'src/table/Table'
import { UsersFilters } from 'src/table/components/UsersFilters'

// TYPES & CONSTANTS
import { columns } from 'src/admin/components/users/columns'
import { GridSortModel } from '@mui/x-data-grid'

export const UsersTable: React.FC = () => {
  const dispatch = useDispatch()

  const tableFilters = useSelector(getUserFilters)

  const [paginationRequest, setPaginationRequest] = usePagination()
  const [tableSort, setTableSort] = React.useState<GridSortModel>([])

  const {
    data: { items, metadata },
  } = useUsers({
    page: paginationRequest.page,
    pageSize: paginationRequest.pageSize,
    sortBy: tableSort[0]?.field,
    sortDirection: tableSort[0]?.sort,
    startCreatedDateTime: tableFilters.startCreatedDateTime,
    endCreatedDateTime: tableFilters.endCreatedDateTime,
    email: tableFilters.email,
    roles: tableFilters.roles,
  })

  return (
    <Table
      tableHeader="Users"
      filtersComponent={
        <UsersFilters
          filters={tableFilters}
          onFilter={(filters) => dispatch(actions.setUserFilters(filters))}
        />
      }
      paginationMetadata={metadata}
      paginationModel={{
        page: metadata.page - 1,
        pageSize: metadata.pageSize,
      }}
      onPaginationModelChange={({ page, pageSize }) =>
        setPaginationRequest({ page: page + 1, pageSize })
      }
      rows={items}
      columns={columns}
      sortModel={tableSort}
      onSortModelChange={setTableSort}
    />
  )
}
