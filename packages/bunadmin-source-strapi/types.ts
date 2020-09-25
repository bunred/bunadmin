import { TFunction } from "i18next"
import { Query } from "material-table"
import { ListServiceRes } from "@bunred/bunadmin"

export type DataCtrl = {
  t?: TFunction
  listService?: () => Promise<ListServiceRes>
  tableQuery: ListService["tableQuery"]
  path?: ListService["path"]
  prefix?: ListService["prefix"]
  skipCount?: ListService["skipCount"]
  fixCount?: ListService["skipCount"]
  searchField?: ListService["searchField"]
  searchSuffix?: ListService["searchSuffix"]
}

export type ListService = {
  tableQuery: Query<any>
  path: string
  prefix?: string
  skipCount?: boolean
  fixCount?: boolean // strapi core APIs (*/count) return number, plugins return { count: number }
  searchField?: "name" | string
  searchSuffix?: "_contains" | string
}
