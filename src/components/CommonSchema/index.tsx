import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import rxDb from "@/utils/database/rxConnect"
import { Collection } from "@/core/schema/collections"
import { CommonTableHead } from "../CommonTable"
import MaterialTable from "material-table"
import { editableController } from "./controllers/editableController"
import { CommonTableDefaultProps as DefaultProps } from "../CommonTable/models/defaultProps"
import tableIcons from "../CommonTable/models/tableIcons"
import { Type } from "@/core/schema/types"
import { useTheme } from "@material-ui/core/styles"
import { Skeleton } from "@material-ui/lab"
import { Box } from "@material-ui/core"
import Plugins from "../Plugins"
import CommonError from "../CommonError"
import { LocalDataRoute } from "@/utils/routes"
import dataController from "@/components/CommonSchema/controllers/dataController"
import columnsController from "@/components/CommonSchema/controllers/columnsController"

interface Interface {
  group: string
  name: string
}

interface StateSchemaType {
  schema: Type
  schemas: Type[]
  notFound: boolean
}

export default function CommonSchema() {
  const theme = useTheme()
  const router = useRouter()
  const { group, name } = (router.query as unknown) as Interface
  const [ready, setReady] = useState(false)
  const [state, setState] = useState({})
  const { schema, notFound } = state as StateSchemaType
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

          setState({ schema, schemas })
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

  if (!ready)
    return (
      <Box p={3}>
        <Skeleton width={100} />
        <Skeleton />
        <Skeleton />
      </Box>
    )

  return (
    <>
      <CommonTableHead title={name} />
      <MaterialTable
        title={schema.label || name}
        columns={schema.columns}
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
        data={dataController}
      />
    </>
  )
}
