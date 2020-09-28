import React, { useState } from "react"

import { useTheme } from "@material-ui/core/styles"
import { TableDefaultProps as DefaultProps } from "@/components/Table/models/defaultProps"

import Table, { TableHead } from "@/components/Table"
import tableIcons from "@/components/Table/models/tableIcons"
import rxQuery from "@/utils/database/rxQuery"
import { Columns } from "./columns"
import { Schema } from "./schema"
import { Collection } from "./collections"
import { useTranslation } from "react-i18next"

export default function AuthInfoContainer() {
  const { t } = useTranslation("table")
  const theme = useTheme()
  const [data, setData] = useState([])

  React.useEffect(() => {
    ;(async () => {
      await rxQuery({
        collection: Collection.name,
        sort: { name: "asc" },
        callback: data => setData(data)
      })
    })()
  }, [])

  return (
    <>
      <>
        <TableHead title={t(Schema.title)} />
        <Table
          title={t(Schema.title)}
          columns={Columns({ t })}
          data={data}
          // style
          style={DefaultProps.style}
          // icons
          icons={tableIcons({ theme })}
          // options
          options={{ ...DefaultProps.options, selection: false }}
        />
      </>
    </>
  )
}
