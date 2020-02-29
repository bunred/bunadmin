import React, { useEffect, useState } from "react"

import { CommonTableHead } from "../../../components/CommonTable"

import { Collection } from "./collections"
import { Schema } from "./schema"
import { Columns } from "./columns"

import { editableController } from "./controllers/editable_controller"
import { CommonTableDefaultProps as DefaultProps } from "../../../components/CommonTable/models/defaultProps"
import rxSubscribe from "../../../utils/local_database/rxSubscribe"
import MaterialTable from "material-table"
import tableIcons from "../../../components/CommonTable/models/tableIcons"
import { useTheme } from "@material-ui/core/styles"

export default function LocalLeftMenuContainer() {
  const theme = useTheme()
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      await rxSubscribe({
        collection: Collection.name,
        sort: { name: "desc" },
        callback: data => setData(data)
      })
    })()
  }, [])

  return (
    <>
      <CommonTableHead title={Schema.title} />
      <MaterialTable
        title={Schema.title}
        columns={Columns}
        editable={editableController()}
        data={data}
        // style
        style={DefaultProps.style}
        // localization props
        localization={DefaultProps.localization}
        // icons
        icons={tableIcons({ theme })}
        // options
        options={{ ...DefaultProps.options, selection: false }}
        // actions
        actions={[]}
        // parentChildData
        parentChildData={(row, rows) => rows.find(a => a.name === row.parent)}
      />
    </>
  )
}
