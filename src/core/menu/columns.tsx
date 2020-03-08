import React from "react"
import { Column } from "material-table"
import { Type } from "./types"
import ParentSelect from "./components/ParentSelect"

export const Columns: Column<Type>[] = [
  { title: "Id", field: "id", editable: "onAdd" },
  { title: "Name", field: "name" },
  { title: "Label", field: "label" },
  { title: "Slug", field: "slug" },
  { title: "Icon", field: "icon" },
  {
    title: "Icon Type",
    field: "icon_type",
    lookup: { eva: "Eva Icon", material: "Material Icon", url: "Url Address" }
  },
  {
    title: "Parent",
    field: "parent",
    initialEditValue: "",
    editComponent: props => <ParentSelect {...props} />
  },
  { title: "Rank", field: "rank", type: "numeric", initialEditValue: "0" }
]
