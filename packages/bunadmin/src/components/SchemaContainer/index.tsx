import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Column } from "material-table"
import { editableController, TableHead, Table, ErrorProps } from "@/components"
import { TableDefaultProps as DefaultProps } from "../Table/models/defaultProps"
import tableIcons from "../Table/models/tableIcons"
import { Type } from "@/core/schema/types"
import { useTheme } from "@material-ui/core/styles"
import { LocalDataRoute } from "@/utils/routes"
import dataController from "./controllers/dataController"
import columnsController from "./controllers/columnsController"
import TableSkeleton from "@/components/Table/components/TableSkeleton"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { selectSchema } from "@/slices/schemaSlice"
import { PluginTableProps } from "@/utils"

interface Interface {
  group: string
  name: string
}

interface StateSchemaType {
  schema: Type
  data: Type
  notFound: boolean
}

interface Props {
  PluginTable: (props: PluginTableProps) => JSX.Element
  Error: (props: ErrorProps) => JSX.Element
  isAuthPath?: boolean
}

export default function SchemaContainer({
  PluginTable,
  Error,
  isAuthPath
}: Props) {
  const { t } = useTranslation("table")
  const theme = useTheme()
  const router = useRouter()
  const { group, name } = (router.query as unknown) as Interface
  const [ready, setReady] = useState(false)
  const [state, setState] = useState({})
  const { schema, data, notFound } = state as StateSchemaType
  const schemas = useSelector(selectSchema)

  useEffect(() => {
    if (!group || !name) return
    ;(async () => {
      // local_database schemas not existed
      if (!schemas) return setState({ notFound: true })
      const current = schemas.filter((item: Interface) => {
        let itemGroup = item.group

        if (itemGroup.indexOf("auth-") > -1) {
          // auth-buncms -> auth
          itemGroup = itemGroup.replace(/auth-.*/, "auth")
        }

        if (itemGroup.indexOf("upload-") > -1) {
          // upload-buncms -> upload
          itemGroup = itemGroup.replace(/upload-.*/, "upload")
        }

        return itemGroup === group && item.name === name
      })

      // current schema not existed
      if (!current[0]) return setState({ notFound: true })

      // loop handing columns
      let columns = current[0].columns
        ? JSON.parse(current[0].columns as string)
        : []
      columns = columnsController({ t, columns })
      const schema = { ...current[0], columns }

      setState({ schema, data: current[0] })
      setReady(true)
    })()
  }, [name])

  if (notFound)
    return (
      <div style={{ display: "flex" }}>
        <Error
          statusCode={404}
          hasLayout={false}
          message={
            "The schema does not existed, you can add it using Schema Manager."
          }
          redirect={LocalDataRoute.schema}
        />
      </div>
    )

  // handle auth path START
  if (!ready && isAuthPath) return null

  if (ready && isAuthPath) {
    // When the auth path does not exist in the plugin, a blank page will be rendered
    return (
      <PluginTable
        team={data.team}
        group={data.group}
        name={data.name}
        hideLoading={true}
      />
    )
  }
  // handle user path END

  if (!ready) return <TableSkeleton />

  // Check customized
  if (data.customized) {
    return <PluginTable team={data.team} group={data.group} name={data.name} />
  }

  const title = (data.label && t(data.label)) || t(name)

  return (
    <>
      <TableHead title={title} />
      <Table
        title={title}
        columns={(schema.columns as unknown) as Column<any>[]}
        style={DefaultProps.style}
        icons={tableIcons({ theme })}
        options={{ ...DefaultProps.options, filtering: true }}
        data={query => dataController({ query, name: data.name })}
        editable={editableController()}
      />
    </>
  )
}
