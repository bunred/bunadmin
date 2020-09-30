import React from "react"
import dynamic from "next/dynamic"
import TableSkeleton from "../components/Table/components/TableSkeleton"
import { PluginTableProps, handlePluginPath } from "@/utils"

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

  const Plugin = dynamic({
    loader: () => import(`../../.bunadmin/dynamic/${pluginPath}`),
    loading: () =>
      hideLoading ? null : <TableSkeleton title={`${name} loading...`} />
  })

  return <Plugin />
}
