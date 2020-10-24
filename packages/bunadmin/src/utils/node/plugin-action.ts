import FileHound from "filehound"
import { PluginData } from "@/utils"

/**
 * NODE MODULE
 * Find active plugins' paths under the [paths]
 * @param paths {string}
 */
export function findPlugins(paths: string): string[] {
  let activePlugins: string[] =
    FileHound.create()
      .paths(paths)
      .depth(1)
      .directory()
      // @ts-ignore
      .match(["bunadmin-auth-*", "bunadmin-upload-*", "bunadmin-plugin-*"])
      .findSync() || []

  /**
   * Handle duplicate auth plugins (keep one)
   * @type {number}
   */
  const countAuth = (
    activePlugins.find(item => /bunadmin-auth-/g.test(item)) || []
  ).length
  if (countAuth > 1) {
    const newArr: string[] = []
    activePlugins.map(item => {
      if (
        (process.env.REACT_APP_AUTH_PLUGIN &&
          item.indexOf(process.env.REACT_APP_AUTH_PLUGIN) > -1) ||
        item.indexOf("bunadmin-auth-") < 0
      ) {
        newArr.push(item)
      }
    })
    activePlugins = newArr
  }

  /**
   * Handle ignored plugins
   */
  const ignoredArr = process.env.REACT_APP_IGNORED_PLUGINS
    ? process.env.REACT_APP_IGNORED_PLUGINS.split(/[ ,]+/)
    : []
  ignoredArr.map(item => {
    const ignoredRegx = new RegExp(item, "g")
    const ignoreIndex = activePlugins.findIndex(item => ignoredRegx.test(item))
    delete activePlugins[ignoreIndex]
  })

  activePlugins = activePlugins.map(item => item)

  return activePlugins
}

/**
 * NODE MODULE
 * Get plugins data from [paths]
 * @param paths
 */
export function getPlugins(paths: string[]): PluginData[] {
  let pluginsData: PluginData[] = []
  paths.map(async pathItem => {
    if (pathItem.indexOf("node_modules") < 0) return

    let plugin
    try {
      plugin = require("" + pathItem)
      if (!plugin || !plugin.initData || !plugin.initData.data) return
      pluginsData = [...pluginsData, ...plugin.initData.data]
    } catch (e) {
      console.error(
        "cannot find 'initData' in the plugin, please export or check: " +
          pathItem
      )
      console.error(e)
    }
  })

  return pluginsData
}
