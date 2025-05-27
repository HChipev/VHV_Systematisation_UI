import { createReducer } from '@reduxjs/toolkit'

// ACTIONS
import { actions } from 'src/admin/components/users/userFiltersActions'

// TYPES & CONSTANTS
import { UserFilters } from 'src/admin/types'

export interface UserFilterState {
  filters: UserFilters
}

export const initialState: UserFilterState = {
  filters: {},
}

type SetUserFiltersAction = ReturnType<typeof actions.setUserFilters>

const setUserFiltersTransformer = (
  state: UserFilterState,
  action: SetUserFiltersAction
) => {
  const {
    payload: { filters },
  } = action

  state.filters = filters
}

export const userFiltersReducer = createReducer(initialState, (builder) =>
  builder.addCase(actions.setUserFilters, setUserFiltersTransformer)
)
