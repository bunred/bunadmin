import { MenuType, SchemaType } from "@/core"
import { TFunction } from "i18next"
import { RefObject } from "react"

type Plugin = {
  disable_menu?: boolean
}

type PluginSchema = Pick<
  SchemaType,
  | "id"
  | "team"
  | "group"
  | "label"
  | "name"
  | "created_at"
  | "customized"
  | "columns"
  | "ignore_schema"
>
type PluginMenu = Pick<
  MenuType,
  "slug" | "icon" | "icon_type" | "parent" | "rank" | "ignore_menu"
>

export interface IPluginData extends Plugin, PluginSchema, PluginMenu {}

export type PluginColumns = {
  t: TFunction
  tableRef: RefObject<any>
}
