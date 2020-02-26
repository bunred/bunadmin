import ConfirmDialog from "../../../../../components/CommonDialog/ConfirmDialog"
import rxDb from "../../../../../utils/local_database/rxConnect"
import { fsDownload, fsUpload } from "../../../../../utils/scripts/fs"
import UploadConfirmDialog from "../../../../../components/CommonDialog/UploadCustomDialog"
import bNotice from "../../../notice/controllers/notice"
import React from "react"

interface Interface {
  selData: {
    name: string
    mode: string
  }
  modalState: {
    open: number
    title: string
    msg: string
  }
  uploadModal: {
    open: number
    title: string
    msg: string
  }
}

export default function MigrationDialogs({
  selData,
  modalState,
  uploadModal
}: Interface) {
  return (
    <>
      {/* ConfirmDialog */}
      <ConfirmDialog
        openModal={modalState.open}
        title={modalState.title}
        msg={modalState.msg}
        doFunc={async () => {
          const db = await rxDb()
          switch (selData.mode) {
            case "Export DB":
              db.dump().then((json: any) =>
                fsDownload(json, "bunadmin.txt", "text/plain")
              )
              break
            case "Import DB":
              // db.dump().then((json: any) => console.dir(json))
              break
            default:
              console.error("Missing method")
          }
        }}
      />
      {/* UploadConfirmDialog */}
      <UploadConfirmDialog
        title={uploadModal.title}
        msg={uploadModal.msg}
        accept="text/*"
        openModal={uploadModal.open}
        onChange={async e => {
          try {
            const json = await fsUpload(e)
            const db = await rxDb()
            // dump collection
            if (selData.name !== "ALL") {
              db[selData.name].importDump(json).then(() => {
                // show notice
                bNotice({ title: `Import successful` })
              })
            } else {
              // dump database
              db.importDump(json).then(() => {
                // show notice
                bNotice({ title: `Import successful` })
              })
            }
          } catch (e) {
            // show notice
            await bNotice({
              title: `Import failed`,
              severity: "error",
              content: e.toString()
            })
          }
        }}
      />
    </>
  )
}
