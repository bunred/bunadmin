import { EditableDataType } from "../../../../components/CommonTable/models/editable"
import rxDb from "../../../../utils/local_database/rxConnect"

export function editableController(): EditableDataType<any> {
  return {
    // isEditable: rowData => rowData.not_editable === true, // only name(a) rows would be editable
    // isDeletable: rowData => rowData.not_deletable === true, // only name(a) rows would be deletable
    onRowAdd: newData =>
      new Promise(async resolve => {
        try {
          const db = await rxDb()

          await db.left_menu.insert(newData)
        } catch (e) {
          console.error(e)
        }

        resolve()
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise(async resolve => {
        try {
          const db = await rxDb()

          const query = db.left_menu
            .findOne()
            .where("name")
            .eq(oldData.name)

          await query.update({
            $set: newData
          })
        } catch (e) {
          console.error(e)
        }

        resolve()
      }),
    onRowDelete: oldData =>
      new Promise(async resolve => {
        try {
          const db = await rxDb()

          const query = db.left_menu
            .findOne()
            .where("name")
            .eq(oldData.name)

          await query.remove()
        } catch (e) {
          console.error(e)
        }

        resolve()
      })
  }
}
