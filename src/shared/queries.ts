import { useQuery } from '@tanstack/react-query'

// UTILS
import { apiCalls } from 'src/shared/apiCalls'

// ROLES
export const useUserRoles = () =>
  useQuery({
    queryKey: ['userRoles'],
    queryFn: apiCalls.getUserRoles,
  })
