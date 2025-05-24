import { createAction } from '@reduxjs/toolkit'
import { Roles } from 'src/shared/types'

export const UserActionTypes = {
  SET_USER_ROLES: 'USERS.SET_USER_ROLES',
} as const

const setUserRoles = createAction(
  UserActionTypes.SET_USER_ROLES,
  (roles: Roles[]) => ({
    payload: {
      roles,
    },
  })
)

export const actions = {
  setUserRoles,
}
