import { Column } from "material-table"
import Type from "./types"
import { TFunction } from "i18next"

export default ({ t }: { t: TFunction }) =>
  [
    { title: t("Username"), field: "username", width: 135 },
    { title: t("Password"), field: "password", width: 135, filtering: false },
    { title: t("Email"), field: "emailAddress", width: 135 },
    {
      title: t("Role"),
      field: "role",
      width: 135,
      lookup: {
        1: "Authenticated",
        2: "Public"
      },
      render: r => {
        const role = r.admin ? "admin" : r.groups[0] && r.groups[0].name
        return role && t(role)
      }
    },
    {
      title: t("Blocked"),
      field: "blocked",
      type: "boolean",
      width: 135
    },
    {
      title: t("Confirmed"),
      field: "confirmed",
      type: "boolean",
      width: 135
    },
    {
      title: t("Created At"),
      field: "created",
      editable: "never",
      filtering: false,
      defaultSort: "desc",
      width: 135,
      render: r => r && new Date(r.created).toLocaleString()
    },
    {
      title: t("Updated At"),
      field: "edited",
      editable: "never",
      filtering: false,
      width: 165,
      render: r => (r ? new Date(r.edited).toLocaleString() : "")
    }
  ] as Column<Type>[]
