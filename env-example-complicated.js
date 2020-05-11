/**
 * Environment Variables - More Details
 * You can copy file `env-example-complicated.js` to `env.js`.
 *
 * `MAIN_URL` is required, others are optional.
 * Please leave it undefined if not used.
 */

const url = {
  dev: {
    main: "http://192.168.2.2:51800/api/v1", // main
    auth: "http://192.168.2.2:51801/api/v1", // user
    sites: {
      0: "http://192.168.2.2:51802/api/v1", // shop
      1: "http://192.168.2.2:51803/api/v1", // file
      2: "http://bucket-name.s3-website.Region.amazonaws.com/", // S3
      3: "http://192.168.2.2:51804/api/v1", // blog
    },
    name: "Bunadmin DEV",
    on_18n: true, // enable I18N Button
    on_setting: true // enable Setting Menus
  },
  prod: {
    main: "http://www.bunadmin.com/api/v1", // main
    auth: "http://user.bunadmin.com/api/v1", // user
    sites: {
      0: "http://shop.bunadmin.com/api/v1", // shop
      1: "http://file.bunadmin.com/api/v1", // file
      2: "http://bucket-name.s3-website.Region.amazonaws.com/", // S3
      3: "http://blog.bunadmin.com/api/v1", // blog
    },
    name: "Bunadmin PROD",
    on_18n: false,
    on_setting: false
  },
  stag: {
    main: "http://stag.main.com/api/v1", // main
    auth: "http://stag.user.com/api/v1", // user
    sites: {
      0: "http://stag.shop.com/api/v1", // shop
      1: "http://stag.file.com/api/v1", // file
      2: "http://bucket-name.s3-website.Region.amazonaws.com/", // S3
      3: "http://stag.blog.com/api/v1", // blog
    },
    name: "Bunadmin STAG",
    on_18n: false,
    on_setting: false
  },
}

module.exports = {
  DEV: {
    MAIN_URL: url.dev.main,
    AUTH_URL: url.dev.auth,
    SITE_URLS: `${url.dev.sites[0]}, ${url.dev.sites[1]}, ${url.dev.sites[2]}`,
    SITE_NAME: url.dev.name,
    ON_I18N: url.dev.on_18n,
    ON_SETTING: url.dev.on_setting,
  },
  PROD: {
    MAIN_URL: url.prod.main,
    AUTH_URL: url.prod.auth,
    SITE_URLS: `${url.prod.sites[0]}, ${url.prod.sites[1]}, ${url.prod.sites[2]}`,
    SITE_NAME: url.prod.name,
    ON_I18N: url.prod.on_18n,
    ON_SETTING: url.prod.on_setting,
  },
  STAG: {
    MAIN_URL: url.stag.main,
    AUTH_URL: url.stag.auth,
    SITE_URLS: `${url.stag.sites[0]}, ${url.stag.sites[1]}, ${url.stag.sites[2]}`,
    SITE_NAME: url.stag.name,
    ON_I18N: url.stag.on_18n,
    ON_SETTING: url.stag.on_setting,
  }
}
