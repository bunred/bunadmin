import rxDb from "../../../../utils/local_database/rxConnect"
import { EditableDataType } from "../../../../components/CommonTable/models/editable"
import { Type } from "../types"
import { Collection } from "../collections"
import { Primary } from "../schema"
import bNotice from "../../notice/controllers/notice"

export function editableController(): EditableDataType<Type> {
  const collection = Collection.name
  const primary = Primary

  const nanoId = require("nanoid")(10)
  const created_at = { created_at: Date.now() }
  const updated_at = { updated_at: Date.now() }

  return {
    // isEditable: rowData => rowData.not_editable === true, // only name(a) rows would be editable
    // isDeletable: rowData => rowData.not_deletable === true, // only name(a) rows would be deletable
    onRowAdd: newData =>
      new Promise(async resolve => {
        try {
          const db = await rxDb()

          await db[collection].insert({
            [primary]: nanoId,
            ...newData,
            ...created_at
          })

          // show notice
          await bNotice({ title: `Created successful` })
        } catch (e) {
          console.error(e)
          // console.log(e.parameters.errors.toString())

          // show notice
          await bNotice({
            title: `Created failed`,
            severity: "error",
            content: e.toString()
          })
        }

        resolve()
      }),
    onRowUpdate: newData =>
      new Promise(async resolve => {
        try {
          const db = await rxDb()

          const query = db[collection]
            .findOne()
            .where(primary)
            .eq(newData[primary])

          await query.update({
            $set: {
              ...newData,
              ...updated_at
            }
          })

          // show notice
          await bNotice({ title: `Updated successful` })
        } catch (e) {
          console.error(e)

          // show notice
          await bNotice({
            title: `Updated failed`,
            severity: "error",
            content: e.toString()
          })
        }

        resolve()
      }),
    onRowDelete: oldData =>
      new Promise(async resolve => {
        try {
          const db = await rxDb()

          const query = db[collection]
            .findOne()
            .where(primary)
            .eq(oldData[primary])

          await query.remove()

          // show notice
          await bNotice({ title: `Deleted successful` })
        } catch (e) {
          console.error(e)

          // show notice
          await bNotice({
            title: `Deleted failed`,
            severity: "error",
            content: e.toString()
          })
        }

        resolve()
      })
  }
}
