import { createSelector } from '@reduxjs/toolkit'

// UTILS
import { StoreState } from 'src/redux/store'

const getUserState = (state: StoreState) => state.user

export const getUserRoles = createSelector(
  getUserState,
  (userState) => userState.roles
)
