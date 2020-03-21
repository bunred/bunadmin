import React from "react"

import Head from "next/head"
import MaterialTable from "material-table"
import { useTheme } from "@material-ui/core/styles"
import tableIcons from "./models/tableIcons"
import { CommonTableProps } from "./models/types"
import { CommonTableDefaultProps as DefaultProps } from "./models/defaultProps"
import { useTranslation } from "react-i18next"
import localization from "@/components/CommonTable/localization"

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

export default function CommonTable(props: CommonTableProps<any>) {
  const { t } = useTranslation("table")
  const theme = useTheme()

  return (
    <MaterialTable
      // style
      style={DefaultProps.style}
      // localization props
      localization={localization({ t })}
      // icons
      icons={tableIcons({ theme })}
      // options
      options={{ ...DefaultProps.options, selection: false }}
      // actions
      actions={[]}
      // more props
      {...props}
    />
  )
}
