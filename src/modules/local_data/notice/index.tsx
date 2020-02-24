import React, { RefObject, useRef, useState } from "react"

import MaterialTable from "material-table"
import { useTheme } from "@material-ui/core/styles"
import { CommonTableDefaultProps as DefaultProps } from "../../../components/CommonTable/models/defaultProps"

import { CommonTableHead } from "../../../components/CommonTable"
import tableIcons from "../../../components/CommonTable/models/tableIcons"
import DefaultLayout from "../../../layouts/DefaultLayout"
import rxSubscribe from "../../../utils/local_database/rxSubscribe"
import { Columns } from "./columns"
import { Schema } from "./schema"
import { editableController } from "./controllers/editable_controller"
import { Collection } from "./collections"
import ConfirmDialog from "../../../components/CommonDialog/ConfirmDialog"
import rxDb from "../../../utils/local_database/rxConnect"

export default function LocalNoticeContainer() {
  const theme = useTheme()
  const [data, setData] = useState([])
  const myRef = useRef() as RefObject<HTMLDivElement>
  const [selData, setSelData] = useState()
  const [modalState, setModalState] = useState({
    open: 0,
    title: "",
    msg: ""
  })

  React.useEffect(() => {
    ;(async () => {
      await rxSubscribe({
        collection: Collection.name,
        sort: { created_at: "desc" },
        callback: data => setData(data)
      })
    })()
  }, [])

  return (
    <div ref={myRef}>
      <DefaultLayout>
        <CommonTableHead title={Schema.title} />
        <MaterialTable
          title={Schema.title}
          columns={Columns}
          editable={editableController()}
          data={data}
          // style
          style={DefaultProps.style}
          // localization props
          localization={DefaultProps.localization}
          // icons
          icons={tableIcons({ theme })}
          // options
          options={{ ...DefaultProps.options, filtering: true }}
          // actions
          actions={[
            {
              tooltip: "Remove All Selected Notices",
              icon: "delete",
              onClick: (_evt, data) => {
                // @ts-ignore
                const msg = "Do you want to delete " + data.length + " rows ?"
                setModalState({
                  title: "Bulk delete",
                  open: modalState.open + 1,
                  msg
                })
                setSelData(data)
              }
            }
          ]}
          // detailPanel
          detailPanel={rowData => {
            return (
              <div
                style={{
                  color: "white",
                  backgroundColor: theme.bunadmin.iconColor,
                  padding: "10px 30px"
                }}
              >
                {rowData.content || "CONTENT IS EMPTY"}
              </div>
            )
          }}
        />
      </DefaultLayout>
      {/* ConfirmDialog */}
      <ConfirmDialog
        openModal={modalState.open}
        title={modalState.title}
        msg={modalState.msg}
        doFunc={() => {
          // bulk delete
          if (selData.length > 0) {
            // @ts-ignore
            selData.map(async item => {
              try {
                const db = await rxDb()

                const query = db[Collection.name]
                  .findOne()
                  .where("id")
                  .eq(item.id)

                await query.remove()
              } catch (e) {
                console.error(e)
              }
            })
          }
        }}
      />
    </div>
  )
}
