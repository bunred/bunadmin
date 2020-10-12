import { Column } from "material-table"
import Type from "./types"

export default function Columns(): Column<Type>[] {
  return [
    {
      title: "ID",
      field: "id",
      type: "numeric",
      width: 100,
      defaultSort: "desc"
    },
    {
      title: "Name",
      field: "name"
    },
    {
      title: "Content",
      field: "content"
    }
  ]
}
