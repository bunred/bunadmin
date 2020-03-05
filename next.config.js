const path = require('path')

module.exports = {
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
