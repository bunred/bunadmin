/**
 * Environment Variables
 *
 * Please copy the file `env-example.js` to `env.js`.
 *
 * "MAIN_URL" is required, others are optional.
 *  Please comment or delete them if you not needed.
 */

module.exports = {
  DEV: {
    MAIN_URL: "http://192.168.2.2:51800/api/v1",
    AUTH_URL: "http://192.168.2.2:51801/api/v1",
    SITE_URLS: "http://192.168.2.2:51802/api/v1, http://192.168.2.2:51803/api/v1",
  },
  PROD: {
    MAIN_URL: "http://www.bunadmin.com/api/v1",
    AUTH_URL: "http://user.bunadmin.com/api/v1",
    SITE_URLS: "http://doc.bunadmin.com/api/v1, http://blog.bunadmin.com/api/v1",
  },
  STAG: {
    MAIN_URL: "http://10.0.0.2:51800/api/v1",
    AUTH_URL: "http://10.0.0.2:51801/api/v1",
    SITE_URLS: "http://10.0.0.2:51802/api/v1, http://10.0.0.2:51803/api/v1",
  }
}
