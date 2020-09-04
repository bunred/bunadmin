import initData from "./utils/initData"
export * from "./utils/types"

import users from "./users"
import signIn from "./sign-in"

export { initData, signIn, users }

export const authResponseKey = "id"
export const authRequestUrl = "/users/me"
export const authRequestMethod = "GET"
