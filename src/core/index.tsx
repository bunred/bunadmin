import noticeController from "./notice/controllers/noticeController"
import { Type as TypeSchema } from "./schema/types"
import { Type as TypeMenu } from "@/core/menu/types"
import { Type as TypeSetting } from "@/core/setting/types"

export const notice = noticeController

export { Collection as Schema } from "./schema/collections"
export { Collection as Setting, SettingNames } from "./setting/collections"
export { Collection as Auth } from "./auth/collections"
export { Collection as Menu } from "@/core/menu/collections"

export { Primary as AuthPrimary } from "./auth/schema"

export type SchemaType = TypeSchema
export type MenuType = TypeMenu
export type SettingType = TypeSetting
