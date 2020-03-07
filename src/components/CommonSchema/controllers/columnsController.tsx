import { Column } from "material-table"

/**
 * Loop handling columns
 * @param columns {Column<any>[]}
 */
export default function columnsController(
  columns: Column<any>[]
): Column<any>[] {
  columns.map(column => {
    // bigint (*id field) to string
    if (typeof column.field === "string" && column.field.indexOf("id") > -1) {
      column.render = r => r.id && r.id.toString()
    }

    return column
  })

  return columns
}
