import rxDb from "../rxConnect"
import { Collection as Setting } from "@/core/setting/collections"
import initSetting from "./initSetting"

export default async function rxNewDocuments() {
  const db = await rxDb()
  const setting = db[Setting.name]
  const is_init = await setting.findOne({ name: { $eq: "init_status" } }).exec()

  if (is_init) {
    /**
     * !!!DEBUG ONLY
     * Initialize data every refresh
     */
    // await setting.remove()

    return console.log("DatabaseService: initialization data already exists")
  } else {
    await initSetting()

    // set init status
    await setting.upsert({
      name: "init_status",
      value: "done"
    })

    return console.log("DatabaseService: data initialized successfully")
  }
}
