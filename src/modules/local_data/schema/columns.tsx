import React from "react"

import { Column } from "material-table"
import { Type } from "./types"
import EditColumns from "./components/EditColumns"

export const Columns: Column<Type>[] = [
  { title: "Id", field: "id", editable: "onAdd" },
  { title: "Group", field: "group" },
  { title: "Name", field: "name" },
  {
    title: "Created At",
    field: "created_at",
    editable: "never",
    render: r => <>{r && new Date(r.created_at).toLocaleString()}</>
  },
  {
    title: "Updated At",
    field: "updated_at",
    editable: "never",
    render: r => <>{r ? new Date(r.updated_at).toLocaleString() : ""}</>
  },
  {
    title: "Columns",
    field: "columns",
    editComponent: props => <EditColumns {...props} />,
    render: r => <>{r && r.columns ? "..." : "EMPTY"}</>
  }
]
