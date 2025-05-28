import * as React from 'react'

// UTILS
import { usePagination } from 'src/shared/utils'

// COMPONENTS
import { Table } from 'src/table/Table'
import { UpdateResourceTypeDialog } from 'src/admin/components/types/UpdateResourceTypeDialog'
import { DeleteResourceTypeDialog } from 'src/admin/components/types/DeleteResourceTypeDialog'

// TYPES & CONSTANTS
import { columns } from 'src/admin/components/types/columns'
import { GridSortModel } from '@mui/x-data-grid'
import { UseQueryResult } from '@tanstack/react-query'
import { PaginatedResponse, PaginationMetadataBase } from 'src/shared/types'
import { ResourceType, ResourceTypeResponse } from 'src/documents/types'
import {
  ResourceTypeModelRequest,
  ResourceTypeRequestQuery,
} from 'src/admin/components/types/types'

interface Props {
  useQuery: (
    paginationQuery: ResourceTypeRequestQuery
  ) => UseQueryResult<
    PaginatedResponse<ResourceTypeResponse, PaginationMetadataBase>,
    Error
  >
  tableHeader: string
  resourceName: string
  onUpdate: (
    id: number,
    data: ResourceTypeModelRequest,
    onSuccess: () => void
  ) => void
  onDelete: (id: number, onSuccess: () => void) => void
  genericHeaderActionComponent?: React.ReactNode
}

export const ResourceTypeTable: React.FC<Props> = ({
  useQuery,
  tableHeader,
  resourceName,
  onUpdate,
  onDelete,
  genericHeaderActionComponent,
}) => {
  const [paginationRequest, setPaginationRequest] = usePagination()
  const [tableSort, setTableSort] = React.useState<GridSortModel>([])
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [resource, setResource] = React.useState<ResourceType | null>(null)

  const { data, isLoading } = useQuery({
    page: paginationRequest.page,
    pageSize: paginationRequest.pageSize,
    sortBy: tableSort[0]?.field,
    sortDirection: tableSort[0]?.sort,
  })

  let items: ResourceTypeResponse[] = []
  let metadata: PaginationMetadataBase = { page: 1, pageSize: 25, count: 0 }

  if (data) {
    ;({ items, metadata } = data)
  }

  return (
    <>
      <Table
        loading={isLoading}
        genericHeaderActionComponent={genericHeaderActionComponent}
        tableHeader={tableHeader}
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
          (id, name, description) => {
            setResource({ id, name, description })
            setIsUpdateDialogOpen(true)
          },
          (id, name, description) => {
            setResource({ id, name, description })
            setIsDeleteDialogOpen(true)
          }
        )}
        sortModel={tableSort}
        onSortModelChange={setTableSort}
      />

      {isUpdateDialogOpen && resource && (
        <UpdateResourceTypeDialog
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
          resourceName={resourceName}
          onUpdate={(id, model) =>
            onUpdate(id, model, () => setIsUpdateDialogOpen(false))
          }
          resource={resource}
        />
      )}

      {isDeleteDialogOpen && resource && (
        <DeleteResourceTypeDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          resourceName={resourceName}
          onDelete={(id) => onDelete(id, () => setIsDeleteDialogOpen(false))}
          resource={resource}
        />
      )}
    </>
  )
}
