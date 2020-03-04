import rxDb from "../rxConnect"
import { Collection as Setting } from "../../../modules/local_data/setting/collections"
import initSetting from "./initSetting"

export default async function rxNewDocuments() {
  const db = await rxDb()
  const setting = db[Setting.name]
  const is_init = await setting.findOne({ name: { $eq: "init_status" } }).exec()

  if (is_init) {
    // !!!JUST FOR DEBUG (init every time )
    // await setting.remove()

    return console.log("InitData: existed")
  } else {
    await initSetting()

    // set init status
    await setting.upsert({
      name: "init_status",
      value: "done"
    })

    return console.log("InitData: successful")
  }
}
