import React, { RefObject, useEffect, useRef, useState } from "react"

import Head from "next/head"
import MaterialTable from "material-table"
import { useTheme } from "@material-ui/core/styles"
import tableIcons from "./models/tableIcons"
import { CommonTableProps } from "./models/types"
import { addTdController } from "./controllers/add_td_controller"
import { CommonTableDefaultProps as DefaultProps } from "./models/defaultProps"
import rxSubscribe from "../../utils/local_database/rxSubscribe"

export function CommonTableHead({ title }: { title?: string }) {
  return (
    <Head>
      <title>{title || "List"} - BunAdmin</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
  )
}

export default function CommonTable({ ...props }: CommonTableProps<any>) {
  const {
    collection,
    sort,
    listTitle,
    style,
    columns,
    editable,
    options,
    actions
  } = props
  const theme = useTheme()
  const [listData, setListData] = useState([])
  const [selectedRow, setSelectedRow] = useState({ tableData: { id: null } })
  const tableRef = useRef() as RefObject<HTMLDivElement>

  useEffect(() => {
    ;(async () => {
      await rxSubscribe({
        collection: collection,
        sort: sort,
        callback: data => {
          setListData(data)
          // create <td /> when click add/create button
          addTdController({ tableRef })
        }
      })
    })()
  }, [])

  const onRowClick = (_evt: any, selectedRow: any) =>
    setSelectedRow(selectedRow)

  const rowStyle = (rowData: { tableData: { id: any } }) => ({
    backgroundColor:
      selectedRow && selectedRow.tableData.id === rowData.tableData.id
        ? "rgba(51, 102, 255, 0.04)"
        : "#FFF"
  })

  const mtbRef = React.createRef()

  return (
    <div ref={tableRef}>
      <CommonTableHead title={listTitle} />
      <MaterialTable
        {...props}
        tableRef={mtbRef}
        style={style || DefaultProps.style}
        title={listTitle}
        columns={columns}
        data={listData}
        // editable
        editable={editable || {}}
        // localization props
        localization={DefaultProps.localization}
        // icons
        icons={tableIcons({ theme })}
        // on row click
        onRowClick={onRowClick}
        // options
        options={
          options
            ? { ...DefaultProps.options, rowStyle, ...options }
            : { ...DefaultProps.options, rowStyle }
        }
        // actions
        actions={actions || DefaultProps.actions}
      />
    </div>
  )
}
