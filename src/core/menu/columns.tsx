import { Column } from "material-table"
import { Type } from "./types"
import editComponentController from "./controllers/editComponentController"

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
    editComponent: editComponentController
  },
  { title: "Rank", field: "rank", type: "numeric", initialEditValue: "0" }
]
