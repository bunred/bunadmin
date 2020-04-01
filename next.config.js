const envCtrl = require("./env-ctrl")
const path = require('path')
const FileHound = require('filehound')
const fs = require("fs")

module.exports = phase => {

  const env = envCtrl(phase)

  // Generate pluginsData.json START
  // find all plugin initData files
  const pluginsPath = path.resolve('plugins')
  const pluginsInitFiles = FileHound.create()
    .paths(pluginsPath)
    .match('initData.tsx')
    .findSync()
  let jsonStr = JSON.stringify(pluginsInitFiles)

  // replace to {team}-{group} path
  jsonStr = jsonStr.replace(/\\\\/g, "/")
  jsonStr = jsonStr.replace(/".*?\/plugins\/(.*?)"/gm, `"$1"`)

  const name = 'pluginsData.json'
  const savePath = path.resolve(__dirname, 'plugins', name)
  fs.writeFile(savePath, jsonStr, 'utf8', () => { console.log(`Write to ${name}`) })
  // Gen pluginsData.json END

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
