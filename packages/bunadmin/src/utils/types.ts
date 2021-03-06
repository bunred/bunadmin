import { MenuType, SchemaType } from "@/core"
import { TFunction } from "i18next"
import { RefObject } from "react"
import { DocsData } from "@/utils/database/rxInitData/initDocsData"

export interface IPluginData {
  id: SchemaType["id"]
  name: SchemaType["name"]
  team: SchemaType["team"]
  group: SchemaType["group"]
  label?: SchemaType["label"]
  role?: SchemaType["role"]
  customized?: SchemaType["customized"]
  columns?: SchemaType["columns"] // Column<any>[] (JsonStr)
  ignore_schema?: SchemaType["ignore_schema"]
  icon?: MenuType["icon"]
  icon_type?: MenuType["icon_type"]
  parent?: MenuType["parent"]
  rank?: MenuType["rank"]
  ignore_menu?: MenuType["ignore_menu"]
}

export type PluginColumns = {
  t: TFunction
  tableRef: RefObject<any>
}

export type PluginTableProps = {
  team: string
  group: string
  name: string
  hideLoading?: boolean
}

export type AuthProps = {
  authResponseKey?: IAuthPlugin["authResponseKey"]
  authRequestUrl?: IAuthPlugin["authRequestUrl"]
  authRequestMethod?: IAuthPlugin["authRequestMethod"]
}

export interface IAuthPlugin {
  initData?: InitData
  authResponseKey?: string
  authRequestUrl?: string
  authRequestMethod?: string
}

export type NoticePlugin = {
  NotificationTable?: JSX.Element
  notificationCount?: () => Promise<number>
}

export type InitData = {
  plugin: string
  list?: {
    name: string
    data: any
  }[]
  data?: PluginData[]
}

export type PluginData = DocsData

export type ListServiceRes = {
  data: any
  totalCount: number
  errors: any
}

export interface EditableCtrl {
  t: TFunction
  SchemaName: string
  disableAdd?: boolean
  primaryKey?: string
}
