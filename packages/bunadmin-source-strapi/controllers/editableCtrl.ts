import { EditableCtrl, EditableDataType } from "@bunred/bunadmin"
import updateSer from "../services/updateSer"
import deleteSer from "../services/deleteSer"
import addSer from "../services/addSer"
import bulkUpdateSer from "../services/bulkUpdateSer"

export default function editableCtrl({
  t,
  SchemaName,
  disableAdd
}: EditableCtrl): EditableDataType<any> {
  return {
    // isEditable: rowData => rowData.not_editable === true, // only name(a) rows would be editable
    // isDeletable: rowData => rowData.not_deletable === true, // only name(a) rows would be deletable
    onRowAdd: disableAdd
      ? undefined
      : async newData => await addSer({ t, SchemaName, newData }),
    onRowUpdate: async (newData, oldData) =>
      await updateSer({ t, SchemaName, newData, oldData }),
    onBulkUpdate: async changes => bulkUpdateSer({ t, SchemaName, changes }),
    onRowDelete: oldData => deleteSer({ t, SchemaName, oldData })
  }
}
