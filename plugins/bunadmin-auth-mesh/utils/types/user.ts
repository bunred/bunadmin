import { IRole } from "./role"

/**
 * Model definition for user
 */
export interface IUser {
  uuid: string
  username: string
  emailAddress: string
  admin: boolean
  password?: string
  forcedPasswordChange: boolean
  enabled: boolean
  confirmed?: boolean
  groups: IRole[]
}
