/**
 * Environment Controller
 */
const { DEV, PROD, STAG } = require('./env')

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging = PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  return {
    MAIN_URL: (() => {
      if (isDev) return DEV.AUTH_URL
      if (isProd) return PROD.AUTH_URL
      if (isStaging) return STAG.AUTH_URL
      return 'AUTH_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    AUTH_URL: (() => {
      if (isDev) return DEV.AUTH_URL
      if (isProd) return PROD.AUTH_URL
      if (isStaging) return STAG.AUTH_URL
      return 'AUTH_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    SITE_URLS: (() => {
      if (isDev) return DEV.SITE_URLS
      if (isProd) return PROD.SITE_URLS
      if (isStaging) return STAG.SITE_URLS
      return 'SITE_URLS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
  }
}