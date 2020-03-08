import React from "react"
import dynamic from "next/dynamic"
import TableSkeleton from "@/components/CommonTable/components/TableSkeleton"

interface Props {
  team: string
  group: string
  name: string
}

function Plugins({ team, group, name }: Props) {
  const pluginPath = `${team}-${group}/${name}`

  const Plugin = dynamic({
    loader: () => import(`@plugins/${pluginPath}`),
    loading: () => <TableSkeleton title={`${name} loading...`} />
  })

  return <Plugin />
}

export default Plugins
