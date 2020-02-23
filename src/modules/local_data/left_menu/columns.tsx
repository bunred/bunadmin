import { Column } from "material-table"
import { Type } from "./types"
import editComponentController from "./controllers/edit_component_controller"

export const Columns: Column<Type>[] = [
  { title: "Name", field: "name" },
  { title: "Label", field: "label" },
  { title: "Slug", field: "slug" },
  {
    title: "Parent",
    field: "parent",
    initialEditValue: "",
    editComponent: editComponentController
  },
  { title: "Rank", field: "rank", type: "numeric", initialEditValue: "0" }
]
