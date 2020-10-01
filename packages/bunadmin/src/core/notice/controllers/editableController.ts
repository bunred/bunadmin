import rxDb from "@/utils/database/rxConnect"
import { EditableDataType } from "@/components/Table/models/types"
import { Type } from "../types"
import { Collection } from "../collections"
import { Primary } from "../schema"

export function editableController(): EditableDataType<Type> {
  const collection = Collection.name
  const primary = Primary

  return {
    onRowDelete: async oldData => {
      try {
        const db = await rxDb()

        const query = db[collection]
          .findOne()
          .where(primary)
          .eq(oldData[primary])

        await query.remove()
      } catch (e) {
        console.error(e)
      }
    }
  }
}
