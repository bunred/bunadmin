import request from "../../utils/scripts/request"
import rxDb from "../../utils/local_database/rxConnect"
import { Collection as Auth } from "../../modules/local_data/auth/collections"
import { Collection as Setting } from "../../modules/local_data/setting/collections"
import { Primary } from "../../modules/local_data/auth/schema"

async function verifyService(): Promise<any> {
  const authStore = Auth.name
  const setting = Setting.name
  const db = await rxDb()

  // query username from bunadmin_setting
  const settingRes = await db[setting]
    .findOne()
    .where("name")
    .eq(Primary)
    .exec()
  const username = (settingRes && settingRes.value) || ""

  // query user from auth_store
  const localUser = await db[authStore]
    .findOne()
    .where(Primary)
    .eq(username)
    .exec()
  const userToken = localUser && localUser.token

  // query online user with token
  return request("/auth/me", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  })
}

export default verifyService
