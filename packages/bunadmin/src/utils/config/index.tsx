function strToArr(str?: string) {
  if (!str) return []
  return str.split(/[ ,]+/)
}

interface EnvTypes {
  AUTH_PLUGIN: string
  MAIN_URL?: string
  AUTH_URL?: string
  SITE_URLS: string[]
  SITE_NAME: string
  ON_I18N: boolean
  ON_SETTING: boolean
  ON_DOC: boolean
  I18N_CODE: string
  ON_MOCK: boolean
}

export const ENV: EnvTypes = {
  AUTH_PLUGIN: process.env.NEXT_PUBLIC_AUTH_PLUGIN || "bunadmin-auth-buncms",
  MAIN_URL: process.env.NEXT_PUBLIC_MAIN_URL,
  AUTH_URL:
    process.env.NEXT_PUBLIC_AUTH_URL || process.env.NEXT_PUBLIC_MAIN_URL,
  SITE_URLS: strToArr(process.env.NEXT_PUBLIC_SITE_URLS),
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || "BunAdmin",
  ON_I18N: process.env.NEXT_PUBLIC_ON_I18N === "true" || false,
  ON_SETTING: process.env.NEXT_PUBLIC_ON_SETTING === "true" || false,
  ON_DOC: process.env.NEXT_PUBLIC_ON_DOC === "true" || false,
  I18N_CODE: process.env.NEXT_PUBLIC_I18N_CODE || "en",
  ON_MOCK: !!process.env.NEXT_PUBLIC_ON_MOCK || false
}
