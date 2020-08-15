export { useTranslation } from "react-i18next"
import mockjs from "mockjs"
export const Mock = mockjs

export * from "./types"
export { store } from "./store"
export { ENV } from "./config"
export { DynamicRoute, UserRoute } from "./routes"
export { default as rxDb } from "./database/rxConnect"
export { default as defaultTheme } from "./themes/defaultTheme"

export { default as initData } from "./scripts/initData"
export { default as request } from "./scripts/request"
export { default as storedToken } from "./scripts/storedToken"

export { default as dataToGql } from "./scripts/dataToGql"
