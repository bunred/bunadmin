const envCtrl = require("./env-ctrl")
const path = require('path')

module.exports = phase => {

  const env = envCtrl(phase)

  return {
    env,
    poweredByHeader: false,
    generateBuildId: async () => {
      return 'bunadmin-v1'
    },
    // webpack
    webpack: (config) => {
      config.resolve.alias['@'] = path.resolve(__dirname, 'src')
      config.resolve.alias['@plugins'] = path.resolve(__dirname, 'plugins')
      return config
    },
  }
}
