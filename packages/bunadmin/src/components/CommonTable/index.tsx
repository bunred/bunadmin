import React from "react"

import Head from "next/head"
import MaterialTable from "material-table"
import { useTheme } from "@material-ui/core/styles"
import tableIcons from "./models/tableIcons"
import { CommonTableProps } from "./models/types"
import { CommonTableDefaultProps as DefaultProps } from "./models/defaultProps"
import { useTranslation } from "react-i18next"
import localization from "@/components/CommonTable/localization"
import { ENV, DynamicRoute } from "@/utils"
import { useRouter } from "next/router"

export function CommonTableHead({ title }: { title?: string }) {
  return (
    <Head>
      <title>
        {title || "List"} - {ENV.SITE_NAME}
      </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  )
}

export default function CommonTable(props: CommonTableProps<any>) {
  const { t } = useTranslation("table")
  const theme = useTheme()
  const router = useRouter()
  const { group: qGroup, name: qName } = router.query

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
      actions={[
        {
          icon: "refresh",
          tooltip: t("Refresh Data"),
          isFreeAction: true,
          onClick: () => router.push(DynamicRoute, `/${qGroup}/${qName}`)
        }
      ]}
      // more props
      {...props}
    />
  )
}
