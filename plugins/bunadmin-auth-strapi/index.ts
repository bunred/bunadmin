import initData from "./utils/initData"
export * from "./utils/types"

import users from "./users"
import SignIn from "./sign-in"

export { initData, SignIn, users }

export const authResponseKey = "id"
export const authRequestUrl = "/users/me"
export const authRequestMethod = "GET"
