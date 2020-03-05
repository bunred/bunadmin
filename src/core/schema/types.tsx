export interface Type {
  id: string
  created_at: number
  updated_at: number
  team: string
  group: string
  name: string
  label?: string
  path?: string
  columns: string // Column<any>[] (JsonStr)
}
