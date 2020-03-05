import React from "react"

import { Column } from "material-table"
import { Type } from "./types"
import EditColumns from "./components/EditColumns"

export const Columns: Column<Type>[] = [
  { title: "Id", field: "id", editable: "onAdd", grouping: false },
  { title: "Team", field: "team", defaultGroupOrder: 0 },
  { title: "Group", field: "group", defaultGroupOrder: 1 },
  { title: "Name", field: "name", grouping: false },
  { title: "Label", field: "label", grouping: false },
  { title: "Path", field: "path", grouping: false },
  {
    title: "Created At",
    field: "created_at",
    editable: "never",
    grouping: false,
    render: r => <>{r && new Date(r.created_at).toLocaleString()}</>
  },
  {
    title: "Updated At",
    field: "updated_at",
    editable: "never",
    grouping: false,
    render: r => <>{r ? new Date(r.updated_at).toLocaleString() : ""}</>
  },
  {
    title: "Columns",
    field: "columns",
    grouping: false,
    editComponent: props => <EditColumns {...props} />,
    render: r => <>{r && r.columns ? "..." : "EMPTY"}</>
  }
]
