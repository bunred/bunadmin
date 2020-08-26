import { RefObject } from "react"
import { Column } from "material-table"
import Type from "./types"
import { TFunction } from "i18next"

export default ({ t }: { t: TFunction; tableRef?: RefObject<any> }) =>
  [
    {
      title: t("Status"),
      field: "status",
      width: 135,
      lookup: {
        Draft: t("Draft"),
        Pending: t("Pending"),
        Rejected: t("Rejected"),
        Published: t("Published")
      }
    },
    { title: t("Name"), field: "name", width: 115 },
    {
      title: t("Created At"),
      field: "created_at",
      editable: "never",

      defaultSort: "desc",
      width: 135,
      render: r => r && new Date(r.created_at).toLocaleString()
    },
    {
      title: t("Updated At"),
      field: "updated_at",
      editable: "never",
      width: 135,
      render: r => (r ? new Date(r.updated_at).toLocaleString() : "")
    },
    {
      title: t("ID"),
      field: "id",
      hidden: true // for fixed columns
    },
    {
      title: t("Id"),
      field: "id",
      editable: "never",
      width: 135
    }
  ] as Column<Type>[]
