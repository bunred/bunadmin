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
      // alias
      config.resolve.alias['@'] = path.resolve(__dirname, 'src')
      config.resolve.alias['@plugins'] = path.resolve(__dirname, 'plugins')
      // rules
      config.module.rules.push({
        // ignore .md file
        test: /\.md$/,
        use: [{ loader: "ignore-loader" }]
      })
      return config
    },
  }
}
