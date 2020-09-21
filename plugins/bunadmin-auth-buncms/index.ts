import initData from "./utils/initData"

import users from "./users"
import signIn from "./sign-in"

export { initData, users, signIn }

export const authResponseKey = "id"
export const authRequestUrl = "/auth/me"
export const authRequestMethod = "POST"
