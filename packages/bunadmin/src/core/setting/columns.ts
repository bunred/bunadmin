import { Column } from "material-table"
import { Type } from "./types"

export const Columns = ({ t }: any): Column<Type>[] => [
  { title: t("Name"), field: "name" },
  { title: t("Value"), field: "value" },
  {
    title: t("Updated At"),
    field: "updated_at",
    editable: "never",
    grouping: false,
    type: "datetime"
  }
]
