export { useTranslation } from "react-i18next"
import mockjs from "mockjs"
export const Mock = mockjs

export * from "./types"
export { store } from "./store"
export * from "./config"
export * from "./routes"

export { default as rxDb } from "./database/rxConnect"
export { default as rxQuery } from "./database/rxQuery"

export { default as defaultTheme } from "./themes/defaultTheme"

export * from "./scripts"
