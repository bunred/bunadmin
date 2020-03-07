import { Column } from "material-table"

export interface Type {
  id: string
  created_at: number
  updated_at: number
  team: string
  group: string
  name: string
  label?: string
  path?: string
  columns: Column<any>[] // Column<any>[] (JsonStr)
}
