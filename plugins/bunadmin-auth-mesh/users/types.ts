import { IUser } from "../utils/types"

export default interface Values extends IUser {
  created: number
  edited: number
}
