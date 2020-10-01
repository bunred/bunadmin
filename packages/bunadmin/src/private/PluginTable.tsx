import React from "react"
import dynamic from "next/dynamic"
import {
  PluginTableProps,
  TableSkeleton,
  handlePluginPath
} from "@bunred/bunadmin"

/**
 * !DO NOT export PluginTable in @bunred/bunadmin
 * Due to the dynamic import of aliases (@plugin)
 * PluginTable needs to be defined in each project.
 * @param team
 * @param group
 * @param name
 * @param hideLoading
 * @constructor
 */
export default function PluginTable({
  team,
  group,
  name,
  hideLoading
}: PluginTableProps) {
  const pluginPath = handlePluginPath({ team, group, name })

  /**
   * Load plugin that override or customize
   */
  let CustomPlugin
  try {
    CustomPlugin = require(`./plugins/${pluginPath}`)
    CustomPlugin = CustomPlugin.default
  } catch (e) {}

  const Plugin =
    CustomPlugin ||
    dynamic({
      loader: () => import(`../../.bunadmin/dynamic/${pluginPath}`),
      loading: () =>
        hideLoading ? null : <TableSkeleton title={`${name} loading...`} />
    })

  return <Plugin />
}
