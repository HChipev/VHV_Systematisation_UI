import qs from 'qs'

// UTILS
import { isValidDate } from 'src/shared/utils'

export const createQueryString = (obj: unknown) =>
  qs.stringify(obj, {
    indices: false,
    addQueryPrefix: true,
    filter: (_, value: unknown) =>
      isValidDate(value) ? (value as Date).toISOString() : value || undefined,
  })
