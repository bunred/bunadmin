import React from "react"

import MaterialTable from "material-table"
import { useTheme } from "@material-ui/core/styles"
import tableIcons from "./models/tableIcons"
import { TableProps } from "@/components"
import { TableDefaultProps as DefaultProps } from "./models/defaultProps"
import { useTranslation } from "react-i18next"
import localization from "@/components/Table/localization"
import { ENV, DynamicRoute } from "@/utils"
import { useRouter } from "next/router"

export function TableHead({ title }: { title?: string }) {
  React.useEffect(() => {
    document.title = `${title || "List"} - ${ENV.SITE_NAME}`
  }, [])

  return <></>
}

export default function Table(props: TableProps<any>) {
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
