import React from "react"
import dynamic from "next/dynamic"

interface Props {
  team: string
  group: string
  name: string
}

function Plugins({ team, group, name }: Props) {
  const pluginPath = `${team}-${group}/${name}`

  const Plugin = dynamic({
    loader: () => import(`@plugins/${pluginPath}`),
    loading: () => <p>Loading caused by client page transition ...</p>
  })

  return <Plugin />
}

export default Plugins
