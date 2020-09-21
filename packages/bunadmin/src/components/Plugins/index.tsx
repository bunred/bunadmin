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
  const isSpecialPlugin = RegExp(".*-auth|.*-upload").test(pluginPath)

  if (!isSpecialPlugin) {
    // bunadmin-blog/category -> bunadmin-plugin-blog/category

    pluginPath = pluginPath.replace("bunadmin-", "")
    pluginPath = `bunadmin-plugin-${pluginPath}`
  } else {
    // buncms-auth-buncms/users -> bunadmin-auth-buncms/users
    // buncms-upload-buncms/files -> bunadmin-upload-buncms/files

    pluginPath = `bunadmin-${group}/${name}`
  }

  const Plugin = dynamic({
    loader: () => import(`@plugins/${pluginPath}`),
    loading: () =>
      hideLoading ? null : <TableSkeleton title={`${name} loading...`} />
  })

  return <Plugin />
}

export default Plugins
