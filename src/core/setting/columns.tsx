import React from "react"

import { Column } from "material-table"
import { Type } from "./types"

export const Columns: Column<Type>[] = [
  { title: "Name", field: "name" },
  { title: "Value", field: "value" },
  {
    title: "Updated At",
    field: "updated_at",
    editable: "never",
    grouping: false,
    render: r => <>{r ? new Date(r.updated_at).toLocaleString() : ""}</>
  }
]
