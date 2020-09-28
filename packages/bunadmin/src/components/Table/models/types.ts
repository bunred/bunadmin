import { MaterialTableProps } from "material-table"
import { EditableCtrl } from "@/utils"

export interface TableProps<RowData extends object>
  extends MaterialTableProps<RowData> {}

/**
 * https://material-table.com/#/docs/features/editable
 */
export type EditableDataType<RowData extends object> = MaterialTableProps<
  RowData
>["editable"]

export type BulkUpdateProps<RowData> = EditableCtrl & {
  changes: Record<number, { oldData: RowData; newData: RowData }>
}
