import React from "react"
import { Column } from "material-table"
import Type from "./types"
import { PluginColumns, MultipleSelector } from "@bunred/bunadmin"
import { Chip } from "@material-ui/core"
import { ENUM_STATUS } from "./plugin"
import { FileUploader } from "bunadmin-upload-strapi"

export default ({ t }: PluginColumns): Column<Type>[] => [
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
    lookup: ENUM_STATUS(t),
    render: data =>
      data && data.status ? (
        <Chip label={ENUM_STATUS(t)[data.status]} color="primary" />
      ) : (
        <Chip label={ENUM_STATUS(t)["Draft"]} color="primary" />
      ),
    filterComponent: props => (
      <MultipleSelector {...props} valueToLowerCase={false} />
    )
  },
  { title: t("Name"), field: "name", width: 115 },
  {
    title: t("Albums"),
    field: "albums",
    filtering: false,
    width: 300,
    editComponent: editProps => (
      <FileUploader
        t={t}
        viewMode={false}
        noDrawer={true}
        editProps={editProps}
        data={editProps.rowData.albums}
      />
    ),
    render: (rowData: Type) =>
      rowData && <FileUploader data={rowData.albums} t={t} noDrawer={true} />
  },
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
]
