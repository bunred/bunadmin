import { MenuType, SchemaType } from "@/core"

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
>
type PluginMenu = Pick<
  MenuType,
  "slug" | "icon" | "icon_type" | "parent" | "rank"
>

export interface IPluginData extends Plugin, PluginSchema, PluginMenu {}
