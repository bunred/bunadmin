import React from "react"

import { Column } from "material-table"
import { Type } from "./types"

export const Columns: Column<Type>[] = [
  { title: "Name", field: "name" },
  {
    title: "Columns",
    field: "columns",
    render: r => <>{r && r.columns ? "..." : "EMPTY"}</>
  }
]
