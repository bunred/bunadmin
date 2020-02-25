export interface Type {
  id: string
  created_at: number
  updated_at: number
  group: string
  name: string
  columns: string | null // Column<any>[] (JsonStr)
}
