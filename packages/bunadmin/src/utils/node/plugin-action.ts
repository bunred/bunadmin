import FileHound from "filehound"
import { PluginData } from "@/utils"

/**
 * NODE MODULE
 * Find all bunadmin plugin paths under the [paths]
 * @param path {string}
 */
export function findPluginsPaths(path: string): string[] {
  let pluginsInModules: string[] =
    FileHound.create()
      .paths(path)
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
    pluginsInModules.find(item => /bunadmin-auth-/g.test(item)) || []
  ).length
  if (countAuth > 1) {
    const newArr: string[] = []
    pluginsInModules.map(item => {
      if (
        (process.env.NEXT_PUBLIC_AUTH_PLUGIN &&
          item.indexOf(process.env.NEXT_PUBLIC_AUTH_PLUGIN) > -1) ||
        item.indexOf("bunadmin-auth-") < 0
      ) {
        newArr.push(item)
      }
    })
    pluginsInModules = newArr
  }

  /**
   * Handle ignored plugins
   */
  const ignoredArr = process.env.NEXT_PUBLIC_IGNORED_PLUGINS
    ? process.env.NEXT_PUBLIC_IGNORED_PLUGINS.split(/[ ,]+/)
    : []
  ignoredArr.map(item => {
    const ignoredRegx = new RegExp(item, "g")
    const ignoreIndex = pluginsInModules.findIndex(item =>
      ignoredRegx.test(item)
    )
    delete pluginsInModules[ignoreIndex]
  })

  pluginsInModules = pluginsInModules.map(item => item)

  return pluginsInModules
}

/**
 * NODE MODULE
 * Get plugins data from [paths]
 * @param paths
 */
export function getPluginsData(paths: string[]): PluginData[] {
  const Log = require("next/dist/build/output/log")

  let pluginsData: PluginData[] = []
  paths.map(async pathItem => {
    let plugin
    try {
      plugin = require("" + pathItem)
      if (!plugin || !plugin.initData || !plugin.initData.data) return
      pluginsData = [...pluginsData, ...plugin.initData.data]
    } catch (e) {
      Log.error(
        "cannot find 'initData' in the plugin, please export or check: " +
          pathItem
      )
      console.error(e)
    }
  })

  return pluginsData
}
