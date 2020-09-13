function strToArr(str?: string) {
  if (!str) return []
  return str.split(/[ ,]+/)
}

export const DEFAULT_AUTH_PLUGIN = "bunadmin-auth-buncms"

type EnvTypes = {
  SITE_NAME: string
  AUTH_PLUGIN: string
  MAIN_URL?: string
  AUTH_URL?: string
  UPLOAD_URL?: string
  SITE_URLS: string[]
  ON_I18N: boolean
  ON_SETTING: boolean
  ON_DOC: boolean
  I18N_CODE: string
  ON_MOCK: boolean
  NEXT_PUBLIC_IGNORED_PLUGINS: string[]
  NOTIFICATION_PLUGIN?: string
  PATHS_WITHOUT_LAYOUT: string[]
  PATHS_WITHOUT_AUTH: string[]
  OFF_NOTIFICATION_INTERVAL_COUNT: boolean
}

export const ENV: EnvTypes = {
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || "BunAdmin",
  AUTH_PLUGIN: process.env.NEXT_PUBLIC_AUTH_PLUGIN || DEFAULT_AUTH_PLUGIN,
  MAIN_URL: process.env.NEXT_PUBLIC_MAIN_URL,
  AUTH_URL:
    process.env.NEXT_PUBLIC_AUTH_URL || process.env.NEXT_PUBLIC_MAIN_URL,
  UPLOAD_URL:
    process.env.NEXT_PUBLIC_UPLOAD_URL ||
    process.env.NEXT_PUBLIC_AUTH_URL ||
    process.env.NEXT_PUBLIC_MAIN_URL,
  SITE_URLS: strToArr(process.env.NEXT_PUBLIC_SITE_URLS),
  ON_I18N: process.env.NEXT_PUBLIC_ON_I18N === "true" || false,
  ON_SETTING: process.env.NEXT_PUBLIC_ON_SETTING === "true" || false,
  ON_DOC: process.env.NEXT_PUBLIC_ON_DOC === "true" || false,
  I18N_CODE: process.env.NEXT_PUBLIC_I18N_CODE || "en",
  ON_MOCK: process.env.NEXT_PUBLIC_ON_MOCK === "true" || false,
  NEXT_PUBLIC_IGNORED_PLUGINS: strToArr(
    process.env.NEXT_PUBLIC_IGNORED_PLUGINS
  ),
  NOTIFICATION_PLUGIN: process.env.NEXT_PUBLIC_NOTIFICATION_PLUGIN,
  PATHS_WITHOUT_LAYOUT: strToArr(process.env.NEXT_PUBLIC_PATHS_WITHOUT_LAYOUT),
  PATHS_WITHOUT_AUTH: strToArr(process.env.NEXT_PUBLIC_PATHS_WITHOUT_AUTH),
  OFF_NOTIFICATION_INTERVAL_COUNT:
    process.env.NEXT_PUBLIC_OFF_NOTIFICATION_INTERVAL_COUNT === "true" || false
}
