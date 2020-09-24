import React from "react"
import {
  CommonTable,
  CommonTableHead,
  tableIcons,
  CommonTableDefaultProps as DefaultProps
} from "@bunred/bunadmin"
import { useTheme } from "@material-ui/core/styles"

import { SchemaLabel, SchemaColumns } from "./plugin"
import editableCtrl from "./controllers/editableCtrl"
import { useTranslation } from "react-i18next"
import { dataCtrl } from "bunadmin-source-strapi"
import { SchemaName } from "./plugin"

export default function media() {
  const { t } = useTranslation("table")
  const theme = useTheme()

  return (
    <>
      <CommonTableHead title={t(SchemaLabel)} />
      <CommonTable
        title={t(SchemaLabel)}
        columns={SchemaColumns({ t })}
        editable={editableCtrl()}
        // style
        style={DefaultProps.style}
        // icons
        icons={tableIcons({ theme })}
        // options
        options={{
          ...DefaultProps.options,
          selection: false,
          filtering: true
        }}
        // data
        data={async tableQuery =>
          await dataCtrl({
            t,
            tableQuery,
            path: `upload/${SchemaName}`,
            fixCount: true
          })
        }
      />
    </>
  )
}
