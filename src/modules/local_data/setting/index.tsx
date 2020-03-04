import React, { useState } from "react"

import MaterialTable from "material-table"
import { useTheme } from "@material-ui/core/styles"
import { CommonTableDefaultProps as DefaultProps } from "../../../components/CommonTable/models/defaultProps"

import { CommonTableHead } from "../../../components/CommonTable"
import tableIcons from "../../../components/CommonTable/models/tableIcons"
import rxSubscribe from "../../../utils/local_database/rxSubscribe"
import { Columns } from "./columns"
import { Schema } from "./schema"
import { Collection } from "./collections"

export default function AuthInfoContainer() {
  const theme = useTheme()
  const [data, setData] = useState([])

  React.useEffect(() => {
    ;(async () => {
      await rxSubscribe({
        collection: Collection.name,
        sort: { name: "asc" },
        callback: data => setData(data)
      })
    })()
  }, [])

  return (
    <>
      <>
        <CommonTableHead title={Schema.title} />
        <MaterialTable
          title={Schema.title}
          columns={Columns}
          data={data}
          // style
          style={DefaultProps.style}
          // localization props
          localization={DefaultProps.localization}
          // icons
          icons={tableIcons({ theme })}
          // options
          options={{ ...DefaultProps.options, selection: false }}
        />
      </>
    </>
  )
}
