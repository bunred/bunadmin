import React, { createRef } from "react"
import {
  CommonTable,
  CommonTableHead,
  tableIcons,
  CommonTableDefaultProps as DefaultProps
} from "@bunred/bunadmin"
import { useTheme } from "@material-ui/core/styles"

import { SchemaLabel, SchemaColumns, SchemaName } from "./plugin"
import { useTranslation } from "@bunred/bunadmin"
import { dataCtrl, editableCtrl } from "bunadmin-source-strapi"

export default function() {
  const { t } = useTranslation("table")
  const theme = useTheme()
  const tableRef = createRef()

  return (
    <>
      <CommonTableHead title={t(SchemaLabel)} />
      <CommonTable
        tableRef={tableRef}
        title={t(SchemaLabel)}
        columns={SchemaColumns({ t, tableRef })}
        style={DefaultProps.style}
        icons={tableIcons({ theme })}
        options={{
          ...DefaultProps.options,
          filtering: true
        }}
        data={async tableQuery =>
          await dataCtrl({
            t,
            tableQuery,
            path: SchemaName,
            searchField: "name"
          })
        }
        editable={editableCtrl({ t, SchemaName })}
      />
    </>
  )
}
