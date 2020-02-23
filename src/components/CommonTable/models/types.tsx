import { MaterialTableProps } from "material-table"

export interface CommonTableProps<RowData extends object>
  extends MaterialTableProps<RowData> {
  collection: string // collection name
  sort?: string
  listTitle?: string
}
