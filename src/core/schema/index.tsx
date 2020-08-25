import React from "react"

import { useTheme } from "@material-ui/core/styles"
import { CommonTableDefaultProps as DefaultProps } from "@/components/CommonTable/models/defaultProps"

import CommonTable, { CommonTableHead } from "@/components/CommonTable"
import tableIcons from "@/components/CommonTable/models/tableIcons"
import { Columns } from "./columns"
import { Schema } from "./schema"
import dynamic from "next/dynamic"
import jsonViewStyles from "@/utils/styles/jsonViewStyles"
import { Type } from "./types"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { selectSchema } from "@/slices/schemaSlice"
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false })

export default function SchemaManagerContainer() {
  const { t } = useTranslation("table")
  const theme = useTheme()
  let data = useSelector(selectSchema)
  data = data.map((item: Type) => ({ ...item }))

  return (
    <>
      <>
        <CommonTableHead title={t(Schema.title)} />
        <CommonTable
          title={t(Schema.title)}
          columns={Columns({ t })}
          data={data}
          // style
          style={DefaultProps.style}
          // icons
          icons={tableIcons({ theme })}
          // options
          options={{
            ...DefaultProps.options,
            filtering: true,
            grouping: true,
            selection: false
          }}
          // detailPanel
          detailPanel={[
            {
              icon: "code",
              render: rowData => {
                if (!rowData.columns) {
                  return (
                    <div
                      style={{
                        color: "white",
                        backgroundColor: theme.bunadmin.iconColor,
                        padding: "10px 30px"
                      }}
                    >
                      {rowData.columns || rowData.customized
                        ? "CUSTOMIZED"
                        : "EMPTY"}
                    </div>
                  )
                } else {
                  const arr = JSON.parse(rowData.columns) || []
                  return (
                    <DynamicReactJson
                      src={arr}
                      theme="summerfruit:inverted"
                      iconStyle="circle"
                      collapseStringsAfterLength={20}
                      displayObjectSize={false}
                      displayDataTypes={false}
                      style={jsonViewStyles({ theme })}
                    />
                  )
                } // check columns
              } // render
            } // item
          ]}
        />
      </>
    </>
  )
}
