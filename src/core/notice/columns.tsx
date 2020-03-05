import { Column } from "material-table"
import { Type } from "./types"

export const Columns: Column<Type>[] = [
  { title: "Id", field: "id", editable: "never" },
  { title: "Title", field: "title" },
  {
    title: "Severity",
    field: "severity",
    editable: "never",
    lookup: {
      success: "Success",
      error: "Error",
      info: "Info",
      warning: "Warning"
    }
  },
  { title: "Content", field: "content", hidden: true },
  {
    title: "Created At",
    field: "created_at",
    editable: "never",
    render: r => <>{r && new Date(r.created_at).toLocaleString()}</>
  }
]
