import { MaterialTableProps } from "material-table"
import { EditableCtrl } from "@/utils"
import { TFunction } from "i18next"
import { RefObject } from "react"

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

export type BulkDeleteProps = {
  t: TFunction
  SchemaName: string
  tableRef: RefObject<any>
  primaryKey?: string
}
