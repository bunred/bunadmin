const path = require("path")
const preparePlugin = require("./prepare-plugin")
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
})

module.exports = () => {
  return withMDX({
    poweredByHeader: false,
    generateBuildId: async () => {
      return "bunadmin-" + require("./package.json").version
    },
    webpack: (config, { isServer }) => {
      /**
       * fix npm packages that depend on `fs` module
       */
      if (!isServer) {
        config.node = {
          fs: "empty"
        }
      } else {
        const nodeModulesPath = path.resolve(__dirname, "../../node_modules")
        const pluginsDynamicPath = path.resolve(__dirname, "./plugins/dynamic")
        preparePlugin({ nodeModulesPath, pluginsDynamicPath })
      }
      /**
       * alias
       */
      config.resolve.alias["@"] = path.resolve(__dirname, "src")
      config.resolve.alias["@bunred/bunadmin"] = path.resolve(__dirname)
      /**
       * ignore
       */
      config.module.rules.push({
        test: [/\.md$/, /LICENSE$/, /\.yml$/, /\.lock$/, /\.tgz$/, /\.d\.ts$/],
        use: [{ loader: "ignore-loader" }]
      })

      return config
    }
  })
}
