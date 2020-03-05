function strToArr(str?: string) {
  if (!str) return []
  return str.split(/[ ,]+/)
}

interface EnvTypes {
  MAIN_URL: string
  AUTH_URL: string
  SITE_URLS: string[]
}

export const ENV = {
  MAIN_URL: process.env.MAIN_URL,
  AUTH_URL: process.env.AUTH_URL || process.env.MAIN_URL,
  SITE_URLS: strToArr(process.env.SITE_URLS)
} as EnvTypes
