import { MaterialTableProps } from "material-table"

export interface CommonTableProps<RowData extends object>
  extends MaterialTableProps<RowData> {}

export type EditableDataType<RowData extends object> = MaterialTableProps<
  RowData
>["editable"]
