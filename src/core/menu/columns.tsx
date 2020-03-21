import React from "react"
import { Column } from "material-table"
import { Type } from "./types"
import ParentSelect from "./components/ParentSelect"

export const Columns = ({ t }: any): Column<Type>[] => [
  { title: t("Id"), field: "id", editable: "onAdd" },
  { title: t("Name"), field: "name" },
  { title: t("Label"), field: "label" },
  { title: t("Slug"), field: "slug" },
  { title: t("Icon"), field: "icon" },
  {
    title: t("Icon Type"),
    field: "icon_type",
    lookup: { eva: "Eva Icon", material: "Material Icon", url: "Url Address" }
  },
  {
    title: t("Parent"),
    field: "parent",
    initialEditValue: "",
    editComponent: props => <ParentSelect {...props} />
  },
  { title: t("Rank"), field: "rank", type: "numeric", initialEditValue: "0" }
]
