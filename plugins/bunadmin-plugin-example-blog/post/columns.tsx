import { RefObject } from "react"
import { Column } from "material-table"
import Type from "./types"
import { TFunction } from "i18next"

export default ({ t }: { t: TFunction; tableRef?: RefObject<any> }) =>
  [
    {
      title: t("Id"),
      field: "id",
      editable: "never",
      type: "numeric",
      width: 100
    },
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
      type: "datetime",
      filtering: false
    },
    {
      title: t("Updated At"),
      field: "updated_at",
      editable: "never",
      width: 135,
      type: "datetime",
      filtering: false
    }
  ] as Column<Type>[]
