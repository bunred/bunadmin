import React from "react"
import Head from "next/head"
import DefaultLayout from "../../layouts/DefaultLayout"
import MaterialTable from "material-table"
import { useTheme } from "@material-ui/core/styles"
import tableIcons from "./models/tableIcons"
import { CommonTableProps } from "./models/types"
import { LeftMenuType } from "../../modules/local_data/left_menu/types"
import rxDb from "../../utils/local_database/rxConnect"
import EvaIcon from "react-eva-icons"

function HeadComp() {
  return (
    <Head>
      <title>Data List - BunAdmin</title>
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

export default function CommonTable({
  ...props
}: CommonTableProps<LeftMenuType>) {
  const { title, style, columns, data, editable, options } = props

  function CommonTableContainer() {
    const theme = useTheme()
    rxDb()

    return (
      <>
        <HeadComp />
        <MaterialTable
          {...props}
          style={style || { boxShadow: "none" }}
          title={title}
          columns={columns}
          data={data}
          // editable
          editable={editable || {}}
          // localization props
          localization={{
            pagination: {
              labelDisplayedRows: "{from}-{to} of {count}"
            },
            toolbar: {
              nRowsSelected: "{0} row(s) selected"
            },
            header: {
              actions: "Actions"
            },
            body: {
              emptyDataSourceMessage: "No records to display",
              filterRow: {
                filterTooltip: "Filter"
              }
            }
          }}
          // icons
          icons={tableIcons({ theme })}
          // options
          options={
            options || {
              draggable: true,
              selection: true
            }
          }
          // actions
          actions={[
            {
              tooltip: "Remove All Selected Users",
              icon: () => (
                <EvaIcon name="trash-2-outline" size="large" fill="gray" />
              ),
              onClick: (_evt, _data) =>
                alert("Bulk delete rows not supported yet.")
            }
          ]}
        />
      </>
    )
  }

  return <DefaultLayout container={<CommonTableContainer />} />
}
