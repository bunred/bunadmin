import { Collection as Setting } from "@/core/setting/collections"
import rxDb from "../rxConnect"
import { Primary } from "@/core/auth/schema"

async function initSetting() {
  const db = await rxDb()
  await db[Setting.name].bulkInsert([
    {
      name: Primary, // username
      value: undefined
    },
    {
      name: "site_name",
      value: undefined
    },
    {
      name: "theme",
      value: undefined
    },
    {
      name: "theme",
      value: undefined
    }
  ])
}

export default initSetting
