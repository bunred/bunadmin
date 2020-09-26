const path = require("path")
const preparePlugin = require("./prepare-plugin")
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
})

module.exports = () => {
  const asPackage = __dirname.indexOf("/node_modules/") > -1
  const pluginsPath = asPackage
    ? path.resolve(__dirname, "plugins") // PROD using as package
    : path.resolve(__dirname, "../../plugins") // DEV

  return withMDX({
    poweredByHeader: false,
    generateBuildId: async () => {
      return "bunadmin-" + require("./package.json").version
    },
    webpack: (config, { isServer }) => {
      // fix npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: "empty"
        }
      } else {
        // prepare bunadmin plugins
        preparePlugin()
      }
      // alias
      config.resolve.alias["@"] = path.resolve(__dirname, "src")
      config.resolve.alias["@plugins"] = path.resolve(__dirname, pluginsPath)
      config.resolve.alias["@bunred/bunadmin"] = path.resolve(__dirname)
      // rules
      config.module.rules.push({
        // ignore file or file types
        test: /\.md$|LICENSE$|\.yml$|\.lock$|\.jpg$/,
        use: [{ loader: "ignore-loader" }]
      })
      config.module.rules.push({
        test: /\.jsx$|\.tsx$|\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["next/babel"]
          }
        }
      })
      return config
    }
  })
}
