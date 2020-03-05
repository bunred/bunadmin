import React from "react"

import { Column } from "material-table"
import { Type } from "./types"

export const Columns: Column<Type>[] = [
  { title: "Username", field: "username", grouping: false },
  { title: "Role", field: "role" },
  { title: "Token", field: "token", hidden: true },
  {
    title: "Details",
    field: "details",
    grouping: false,
    render: r => <>{r && r.details ? "..." : "EMPTY"}</>
  },
  {
    title: "Last Signed-in",
    field: "updated_at",
    editable: "never",
    grouping: false,
    render: r => <>{r ? new Date(r.updated_at).toLocaleString() : ""}</>
  }
]
