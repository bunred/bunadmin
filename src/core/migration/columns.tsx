import { Column } from "material-table"
import { Type } from "./types"

export const Columns = ({ t }: any): Column<Type>[] => [
  { title: t("Name"), field: "name" }
]
