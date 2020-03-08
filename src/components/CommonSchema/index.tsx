import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import rxDb from "@/utils/database/rxConnect"
import { Collection } from "@/core/schema/collections"
import { CommonTableHead } from "../CommonTable"
import MaterialTable, { Column } from "material-table"
import { editableController } from "./controllers/editableController"
import { CommonTableDefaultProps as DefaultProps } from "../CommonTable/models/defaultProps"
import tableIcons from "../CommonTable/models/tableIcons"
import { Type } from "@/core/schema/types"
import { useTheme } from "@material-ui/core/styles"
import Plugins from "../Plugins"
import CommonError from "../CommonError"
import { LocalDataRoute } from "@/utils/routes"
import dataController from "@/components/CommonSchema/controllers/dataController"
import columnsController from "@/components/CommonSchema/controllers/columnsController"
import TableSkeleton from "@/components/CommonTable/components/TableSkeleton"

interface Interface {
  group: string
  name: string
}

interface StateSchemaType {
  schema: Type
  data: Type
  notFound: boolean
}

export default function CommonSchema() {
  const theme = useTheme()
  const router = useRouter()
  const { group, name } = (router.query as unknown) as Interface
  const [ready, setReady] = useState(false)
  const [state, setState] = useState({})
  const { schema, data, notFound } = state as StateSchemaType
  const Schema = Collection.name

  useEffect(() => {
    if (!group || !name) return
    ;(async () => {
      const db = await rxDb()
      db[Schema].find()
        .exec()
        .then((schemas: any) => {
          // local_database schemas not existed
          if (!schemas) return setState({ notFound: true })
          const current = schemas.filter(
            (item: Interface) => item.group === group && item.name === name
          )

          // current schema not existed
          if (!current[0]) return setState({ notFound: true })

          // loop handing columns
          let columns = JSON.parse(current[0].columns as string)
          columns = columnsController(columns)
          const schema = { ...current[0], columns }

          setState({ schema, data: current[0] })
          setReady(true)
        })
    })()
  }, [name])

  if (notFound)
    return (
      <div style={{ display: "flex" }}>
        <CommonError
          statusCode={404}
          hasLayout={false}
          message={
            "The schema does not existed, you can add it using Schema Manager."
          }
          redirect={LocalDataRoute.schema}
        />
      </div>
    )

  if (!ready) return <TableSkeleton />

  // Check customized
  if (data.customized) {
    return <Plugins team={data.team} group={data.group} name={data.name} />
  }

  return (
    <>
      <CommonTableHead title={name} />
      <MaterialTable
        title={schema.label || name}
        columns={(schema.columns as unknown) as Column<any>[]}
        editable={editableController()}
        // style
        style={DefaultProps.style}
        // localization props
        localization={DefaultProps.localization}
        // icons
        icons={tableIcons({ theme })}
        // options
        options={{ ...DefaultProps.options, filtering: true }}
        // data
        data={query => dataController({ query, name: data.name })}
      />
    </>
  )
}
