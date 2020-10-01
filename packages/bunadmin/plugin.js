const path = require("path")
const fs = require("fs")
const rimraf = require("rimraf")
const Log = require("next/dist/build/output/log")
const { findPlugins, getPlugins } = require("./lib/utils/node/plugin-action")

/**
 * Prepare bunadmin plugins data to `.bunadmin/dynamic/`, `plugins/` directory,
 * generate the data file (menu, schema) `dynamic/pluginsData.json` to `.bunadmin/`,
 * generate the index file (export from node_modules) `[name]/index.js` to
 * `dynamic/[plugin]/[name]/index.js`.
 * generate the data file (menu, schema) `pluginsData.ts` to `plugins/`,
 * @param modulesPath {string}
 * @param dynamicPath {string}
 * @param pluginsPath {string}
 * @return {boolean}
 */
module.exports = ({ modulesPath, dynamicPath, pluginsPath }) => {
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
  rimraf.sync(dynamicPath)

  if (!fs.existsSync(".bunadmin")) {
    fs.mkdirSync(".bunadmin")
  }
  if (!fs.existsSync(dynamicPath)) {
    fs.mkdirSync(dynamicPath)
  }

  const pluginsPaths = findPlugins(modulesPath)
  const pluginsData = getPlugins(pluginsPaths)

  /**
   * Generate `pluginsData.ts` in `plugins/`
   */
  const customPluginsPaths = findPlugins(pluginsPath)
  let importLine = ""
  let arrayLine = ""
  customPluginsPaths.map((path, i) => {
    const name = path.replace(`${pluginsPath}/`, "")
    const varName = `data_${i + 1}`
    importLine += `
import { initData as ${varName} } from "./${name}"`
    const spl = i + 1 === customPluginsPaths.length ? "" : ", "
    arrayLine += `...${varName}${spl}`
  })
  const tsContent = `import { IPluginData } from "@bunred/bunadmin"
${importLine}

export const data: IPluginData[] = [${arrayLine}]
`
  fs.writeFile(`${pluginsPath}/pluginsData.ts`, tsContent, e => {
    if (e) Log.error("cannot generating pluginsData.ts: " + e)
  })

  /**
   * Merge pluginsData
   * Generate pluginsSchema ([plugin]/[group]/[name].js)
   * @type {*[]}
   */
  pluginsPaths.map(async pathItem => {
    if (typeof pathItem !== "string") return
    if (pathItem.indexOf("node_modules") < 0) {
      return
    }

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
     * Generating plugin files under `dynamic/`
     * mkdir directories [plugin], [plugin]/[group]
     * create files [plugin]/[group]/[name].js
     */
    try {
      if (!plugin) return
      const pluginName = pathItem.replace(/.*\//g, "")
      /**
       * Recreate directory dynamic/[plugin]
       */
      const savePluginPath = path.resolve(dynamicPath, pluginName)
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
          dynamicPath,
          `${pluginName}/index.js`
        )
        const saveIndexContent = `export * from "${pluginName}"`
        fs.writeFile(saveIndexPath, saveIndexContent, e => {
          if (e) Log.error("cannot generating plugin index.js: " + e)
        })
      })
    } catch (e) {
      Log.error("cannot generating pluginSchema: " + e)
    }
  })

  const name = "pluginsData.json"
  const savePath = path.resolve(dynamicPath, name)
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
