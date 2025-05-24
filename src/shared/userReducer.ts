import { createReducer } from '@reduxjs/toolkit'

// ACTIONS
import { actions } from 'src/shared/userActions'

// TYPES
import { Roles } from 'src/shared/types'

export interface UserState {
  roles: Roles[]
}

export const initialState: UserState = {
  roles: [],
}

type SetUserRolesAction = ReturnType<typeof actions.setUserRoles>

const setUserRolesTransformer = (
  state: UserState,
  action: SetUserRolesAction
) => {
  const {
    payload: { roles },
  } = action

  state.roles = roles
}

export const userReducer = createReducer(initialState, (builder) =>
  builder.addCase(actions.setUserRoles, setUserRolesTransformer)
)
