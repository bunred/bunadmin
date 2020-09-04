import initData from "./utils/initData"
export * from "./utils/types"

import users from "./users"
import signIn from "./sign-in"

export { initData, signIn, users }

export const authResponseKey = "uuid"
export const authRequestUrl = "/auth/me"
export const authRequestMethod = "GET"
