const { alias, configPaths } = require("react-app-rewire-alias")
const bunadminPlugin = require("./plugin")

module.exports = function override(config) {
  // run bunadmin scripts
  const path = require("path")
  const modulesPath = path.resolve(__dirname, "../../node_modules")
  const dynamicPath = path.resolve(__dirname, "src/.bunadmin/dynamic")
  const pluginsPath = path.resolve(__dirname, "src/private/plugins")
  bunadminPlugin({ modulesPath, dynamicPath, pluginsPath })

  alias({
    ...configPaths("tsconfig.base.json")
  })(config)

  return config
}
