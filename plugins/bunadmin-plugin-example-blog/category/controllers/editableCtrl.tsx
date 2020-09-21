import Type from "../types"
import { EditableDataType } from "@bunred/bunadmin"
import {
  addSer,
  updateSer,
  deleteSer,
  EditableCtrl
} from "bunadmin-source-strapi"

function editableCtrl({ SchemaName }: EditableCtrl): EditableDataType<Type> {
  return {
    // isEditable: rowData => rowData.not_editable === true, // only name(a) rows would be editable
    // isDeletable: rowData => rowData.not_deletable === true, // only name(a) rows would be deletable
    onRowAdd: async newData => await addSer({ newData, SchemaName }),
    onRowUpdate: async (newData, oldData) =>
      await updateSer({ newData, oldData, SchemaName }),
    onRowDelete: oldData => deleteSer({ oldData, SchemaName })
  }
}

export default editableCtrl
