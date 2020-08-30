import React from "react"
import dynamic from "next/dynamic"
import TableSkeleton from "@/components/CommonTable/components/TableSkeleton"

interface Props {
  team: string
  group: string
  name: string
  hideLoading?: boolean
}

function Plugins({ team, group, name, hideLoading }: Props) {
  let pluginPath = `${team}-${group}/${name}`

  // bunadmin-blog/category -> bunadmin-plugin-blog/category
  if (
    pluginPath.indexOf("bunadmin-auth") < 0 &&
    pluginPath.indexOf("bunadmin-upload") < 0
  ) {
    pluginPath = pluginPath.replace("bunadmin-", "")
    pluginPath = `bunadmin-plugin-${pluginPath}`
  }

  const Plugin = dynamic({
    loader: () => import(`@plugins/${pluginPath}`),
    loading: () =>
      hideLoading ? null : <TableSkeleton title={`${name} loading...`} />
  })

  return <Plugin />
}

export default Plugins
