import { IPermission } from "./permission"
import { IUser } from "./user"

/**
 * Model definition for role
 */
export interface IRole {
  uuid: string
  name: string
  description?: string
  type?: string
  permissions: IPermission[]
  users: IUser[]
}
