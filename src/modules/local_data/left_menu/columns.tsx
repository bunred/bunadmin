import { Column } from "material-table"
import { LeftMenuType } from "./types"
import editComponentController from "./controllers/edit_component_controller"

export const leftMenuColumns: Column<LeftMenuType>[] = [
  { title: "Name", field: "name" },
  { title: "Label", field: "label" },
  { title: "Slug", field: "slug" },
  {
    title: "Parent",
    field: "parent",
    editComponent: editComponentController
  },
  { title: "Rank", field: "rank", type: "numeric", initialEditValue: 0 }
]
