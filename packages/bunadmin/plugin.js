const path = require("path")
const fs = require("fs")
const Log = require("next/dist/build/output/log")
const {
  findPluginsPaths,
  getPluginsData
} = require("./lib/utils/node/plugin-action")

/**
 * Prepare bunadmin plugins to `.bunadmin/dynamic` tmp directory,
 * generate the data file (menu, schema) `dynamic/pluginsData.json` to `plugins/`,
 * generate the index file (export from node_modules) `[group]/[name].js` to
 * `dynamic/[plugin]/[group]/[name]`.
 * @param nodeModulesPath {string}
 * @param pluginsDynamicPath {string}
 * @return {boolean}
 */
module.exports = ({ nodeModulesPath, pluginsDynamicPath }) => {
  /**
   * Prepare plugins START
   */
  Log.info("prepare bunadmin plugins")

  /**
   * Generate pluginsData.json START
   */
  Log.wait("preparing...")

  /**
   * Recreate directory .bunadmin/dynamic
   */
  const rimraf = require("rimraf")
  rimraf.sync(pluginsDynamicPath)
  if (!fs.existsSync(".bunadmin")) {
    fs.mkdirSync(".bunadmin")
  }
  if (!fs.existsSync(pluginsDynamicPath)) {
    fs.mkdirSync(pluginsDynamicPath)
  }

  const pluginsPaths = findPluginsPaths(nodeModulesPath)
  const pluginsData = getPluginsData(pluginsPaths)

  /**
   * Merge pluginsData
   * Generate pluginsSchema ([plugin]/[group]/[name].js)
   * @type {*[]}
   */

  pluginsPaths.map(async pathItem => {
    if (typeof pathItem !== "string") return

    let plugin
    try {
      plugin = require(pathItem)
      if (!plugin || !plugin.initData || !plugin.initData.data) return
    } catch (e) {
      Log.error(
        "cannot find 'initData' in the plugin, please export or check: " +
          pathItem
      )
      console.error(e)
    }

    /**
     * Generating plugin files
     * mkdir directories [plugin], [plugin]/[group]
     * create files [plugin]/[group]/[name].js
     */
    try {
      if (!plugin) return
      const pluginName = pathItem.replace(/.*\//g, "")
      /**
       * Recreate directory dynamic/[plugin]
       */
      const savePluginPath = path.resolve(pluginsDynamicPath, pluginName)
      if (!fs.existsSync(savePluginPath)) {
        await fs.mkdirSync(savePluginPath)
      }
      plugin.initData.data.map(async dataItem => {
        if (dataItem["ignore_schema"] || !dataItem["name"]) return
        /**
         * Recreate directory dynamic/[plugin]/[name]
         */
        const saveNamePath = path.resolve(savePluginPath, dataItem["name"])
        if (!fs.existsSync(saveNamePath)) {
          await fs.mkdirSync(saveNamePath)
        }
        const saveNameContent = `export { default } from "${pluginName}/lib/${dataItem["name"]}"`
        fs.writeFile(`${saveNamePath}/index.js`, saveNameContent, e => {
          if (e) Log.error("cannot generating plugin schema: " + e)
        })

        const saveIndexPath = path.resolve(
          pluginsDynamicPath,
          `${pluginName}/index.js`
        )
        const saveIndexContent = `export * from "${pluginName}"`
        fs.writeFile(saveIndexPath, saveIndexContent, e => {
          if (e) Log.error("cannot generating plugin index: " + e)
        })
      })
    } catch (e) {
      Log.error("cannot generating pluginSchema: " + e)
    }
  })

  const name = "pluginsData.json"
  const savePath = path.resolve(pluginsDynamicPath, name)
  fs.writeFile(savePath, JSON.stringify(pluginsData), "utf8", () => {
    /**
     * Prepare plugins END
     */
    Log.info("bunadmin plugins data generated successfully")
  })
  /**
   * Generate pluginsData.json END
   */

  return true
}
