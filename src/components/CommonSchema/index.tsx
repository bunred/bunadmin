import { useRouter } from "next/router"
import rxDb from "../../utils/local_database/rxConnect"
import { Collection } from "../../modules/local_data/schema/collections"
import React, { useEffect, useState } from "react"
import { CommonTableHead } from "../CommonTable"
import MaterialTable from "material-table"
import { editableController } from "../../modules/local_data/schema/controllers/editable_controller"
import { CommonTableDefaultProps as DefaultProps } from "../CommonTable/models/defaultProps"
import tableIcons from "../CommonTable/models/tableIcons"
import { Type } from "../../modules/local_data/schema/types"
import { useTheme } from "@material-ui/core/styles"
import { Skeleton } from "@material-ui/lab"
import { Box } from "@material-ui/core"

interface Interface {
  group: string
  name: string
}

interface StateSchemaType {
  schema: Type
}

export default function CommonSchema() {
  const theme = useTheme()
  const router = useRouter()
  const { group, name } = (router.query as unknown) as Interface
  const [ready, setReady] = useState(false)

  const [state, setState] = useState({})

  const { schema } = state as StateSchemaType

  const schemaCollection = Collection.name

  useEffect(() => {
    if (!group || !name) return
    ;(async () => {
      const db = await rxDb()
      db[schemaCollection]
        .findOne()
        .where("group")
        .eq(group)
        .where("name")
        .eq(name)
        .exec()
        .then((doc: any) => {
          if (!doc) return
          setState({ schema: doc })
          setReady(true)
        })
    })()
  }, [name])

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
        columns={JSON.parse(schema.columns as string)}
        editable={editableController()}
        data={[]}
        // style
        style={DefaultProps.style}
        // localization props
        localization={DefaultProps.localization}
        // icons
        icons={tableIcons({ theme })}
        // options
        options={{ ...DefaultProps.options, filtering: true }}
      />
    </>
  )
}
