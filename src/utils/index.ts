export { useTranslation } from "react-i18next"
import mockjs from "mockjs"
export const Mock = mockjs

export * from "./types"
export { store } from "./store"
export { ENV } from "./config"
export { DynamicRoute, UserRoute } from "./routes"
export { default as rxDb } from "./database/rxConnect"
export { default as defaultTheme } from "./themes/defaultTheme"

export * from "./scripts"
