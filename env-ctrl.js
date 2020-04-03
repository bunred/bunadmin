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
      if (isDev) {
        console.log('ENV: DEV')
        return DEV.MAIN_URL
      }
      if (isProd) {
        console.log('ENV: PROD')
        return PROD.MAIN_URL
      }
      if (isStaging) {
        console.log('ENV: STAG')
        return STAG.MAIN_URL
      }
      return 'MAIN_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
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
    SITE_NAME: (() => {
      if (isDev) return DEV.SITE_NAME
      if (isProd) return PROD.SITE_NAME
      if (isStaging) return STAG.SITE_NAME
      return 'SITE_NAME:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    ON_I18N: (() => {
      if (isDev) return DEV.ON_I18N
      if (isProd) return PROD.ON_I18N
      if (isStaging) return STAG.ON_I18N
      return 'ON_I18N:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    ON_SETTING: (() => {
      if (isDev) return DEV.ON_SETTING
      if (isProd) return PROD.ON_SETTING
      if (isStaging) return STAG.ON_SETTING
      return 'ON_SETTING:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
  }
}
