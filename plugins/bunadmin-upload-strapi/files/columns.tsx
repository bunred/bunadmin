import { Column } from "material-table"
import Type from "./types"
import React from "react"
import { Button, Tooltip } from "@material-ui/core"
import { BunadminFile, ENV } from "@bunred/bunadmin"

const prefix = ENV.UPLOAD_URL

export default ({ t }: any) =>
  [
    { title: t("Id"), field: "id", editable: "never", width: 80 },
    { title: t("Type"), field: "mime", width: 115 },
    {
      title: t("Preview"),
      field: "file_name",
      width: 180,
      render: rowData => (
        <BunadminFile
          width={135}
          viewMode={true}
          prefix={prefix}
          file={rowData}
        />
      )
    },
    { title: t("Name"), field: "name", width: 115 },
    {
      title: t("User"),
      field: "author",
      width: 80,
      render: r => r.created_by?.username
    },
    { title: t("Size"), field: "size", width: 80 },
    {
      title: t("File URL"),
      field: "file_name",
      width: 115,
      render: r => (
        <Tooltip title={r.url} placement="top" arrow>
          <Button>Show</Button>
        </Tooltip>
      )
    },
    {
      title: t("Created At"),
      field: "created_at",
      editable: "never",
      grouping: false,
      defaultSort: "desc",
      render: r => r && new Date(r.created_at).toLocaleString()
    },
    {
      title: t("Updated At"),
      field: "updated_at",
      editable: "never",
      grouping: false,
      render: r => (r ? new Date(r.updated_at).toLocaleString() : "")
    }
  ] as Column<Type>[]
