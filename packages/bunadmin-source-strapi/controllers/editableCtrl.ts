import updateSer from "../services/updateSer"
import deleteSer from "../services/deleteSer"
import addSer from "../services/addSer"
import { EditableCtrl } from "../types"
import { EditableDataType } from "@bunred/bunadmin"

export default function editableCtrl({
  SchemaName
}: EditableCtrl): EditableDataType<any> {
  return {
    // isEditable: rowData => rowData.not_editable === true, // only name(a) rows would be editable
    // isDeletable: rowData => rowData.not_deletable === true, // only name(a) rows would be deletable
    onRowAdd: async newData => await addSer({ newData, SchemaName }),
    onRowUpdate: async (newData, oldData) =>
      await updateSer({ newData, oldData, SchemaName }),
    onRowDelete: oldData => deleteSer({ oldData, SchemaName })
  }
}
