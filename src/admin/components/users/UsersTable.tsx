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
import { AddUserActionComponent } from 'src/admin/components/users/AddUserActionComponent'
import { UpdateUserDialog } from 'src/admin/components/users/UpdateUserDialog'
import { DeleteUserDialog } from 'src/admin/components/users/DeleteUserDialog'

// TYPES & CONSTANTS
import { columns } from 'src/admin/components/users/columns'
import { GridSortModel } from '@mui/x-data-grid'
import { PaginationMetadataBase, User } from 'src/shared/types'
import { UpdateUserRequest } from 'src/admin/components/users/types'

interface Props {
  onUpdate: (id: number, data: UpdateUserRequest, onSuccess: () => void) => void
  onDelete: (id: number, onSuccess: () => void) => void
}

export const UsersTable: React.FC<Props> = ({ onUpdate, onDelete }) => {
  const dispatch = useDispatch()

  const tableFilters = useSelector(getUserFilters)

  const [paginationRequest, setPaginationRequest] = usePagination()
  const [tableSort, setTableSort] = React.useState<GridSortModel>([])
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [user, setUser] = React.useState<Partial<User> | null>(null)

  const { data, isLoading } = useUsers({
    page: paginationRequest.page,
    pageSize: paginationRequest.pageSize,
    sortBy: tableSort[0]?.field,
    sortDirection: tableSort[0]?.sort,
    startCreatedDateTime: tableFilters.startCreatedDateTime,
    endCreatedDateTime: tableFilters.endCreatedDateTime,
    email: tableFilters.email,
    roles: tableFilters.roles,
  })

  let items: User[] = []
  let metadata: PaginationMetadataBase = { page: 1, pageSize: 10, count: 0 }

  if (data) {
    ;({ items, metadata } = data)
  }

  return (
    <>
      <Table
        tableHeader="Users"
        loading={isLoading}
        genericHeaderActionComponent={<AddUserActionComponent />}
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
        columns={columns(
          (id, email, roles) => {
            setUser({ id, email, roles })
            setIsUpdateDialogOpen(true)
          },
          (id, email) => {
            setUser({ id, email })
            setIsDeleteDialogOpen(true)
          }
        )}
        sortModel={tableSort}
        onSortModelChange={setTableSort}
      />

      {isUpdateDialogOpen && user && (
        <UpdateUserDialog
          isOpen={isUpdateDialogOpen}
          user={user}
          onClose={() => setIsUpdateDialogOpen(false)}
          onUpdate={(id, model) =>
            onUpdate(id, model, () => setIsUpdateDialogOpen(false))
          }
        />
      )}

      {isDeleteDialogOpen && user && (
        <DeleteUserDialog
          isOpen={isDeleteDialogOpen}
          user={user}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={(id) => onDelete(id, () => setIsDeleteDialogOpen(false))}
        />
      )}
    </>
  )
}
