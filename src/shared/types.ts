export interface Role {
  name: string
}

export enum Roles {
  Admin = 'Admin',
  User = 'User',
}

export interface ApiError {
  message: string
}
