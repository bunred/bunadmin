import rxDb from "@/utils/database/rxConnect"
import { SeverityType } from "../types"
import { Collection } from "../collections"
import { Primary } from "../schema"
import { store } from "@/utils/store"
import { setNotice } from "@/slices/noticeSlice"

const collection = Collection.name
const primary = Primary

interface Interface {
  title: string
  severity?: SeverityType | null
  content?: string | object
}

export default async function noticeController({
  title,
  severity,
  content
}: Interface) {
  const nanoId = require("nanoid")(10)
  const created_at = { created_at: Date.now() }

  try {
    const db = await rxDb()

    if (typeof content === "object") content = JSON.stringify(content)
    if (typeof content !== "string") {
      content = undefined
      // console.warn(typeof content, content)
    }

    const data = { title, severity: severity || "success", content }

    store.dispatch(
      setNotice({
        title: title,
        severity: severity,
        content: content
      })
    )

    await db[collection].insert({
      [primary]: nanoId,
      ...created_at,
      ...data
    })
  } catch (e) {
    console.error("notice error", e)
  }
}
