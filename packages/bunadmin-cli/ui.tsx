import React, { useEffect, useState } from "react"
import { Text } from "ink"
import newProject from "./commands/new"
import newPlugin from "./commands/plugin"
import newSchema from "./commands/schema"

type UIProps = {
  inputs: string[]
  options: { [key: string]: string }
}

type State = {
  command: "help" | "new" | "plugin" | "schema"
  ready: boolean
  errors?: string
}

type PickOne<T> = {
  [P in keyof T]: Record<P, T[P]> &
    Partial<Record<Exclude<keyof T, P>, undefined>>
}[keyof T]

const UI = (props: UIProps) => {
  const {
    inputs
    // options: { plugin, doc }
  } = props

  const [state, setState] = useState<State>({
    command: "help",
    ready: false,
    errors: undefined
  })

  function updateState(obj: PickOne<State>) {
    setState({ ...state, ...obj })
  }

  const command: State["command"] | string = inputs[0]

  useEffect(() => {
    ;(async () => {
      switch (command) {
        case "new":
          {
            updateState({ command })
            const projectName = inputs[1] || "my-bunadmin"
            const errors = await newProject(projectName)
            updateState({ errors })
          }
          break
        case "plugin":
          {
            updateState({ command })
            const pluginName = inputs[1] || "myteam-myblog"
            const errors = await newPlugin(pluginName)
            updateState({ errors })
          }
          break
        case "schema":
          {
            updateState({ command })
            const pluginName = inputs[1] || "mypost"
            const errors = await newSchema(pluginName)
            updateState({ errors })
          }
          break
        default:
          updateState({
            errors: "Command does not exist, please check help: bunadmin --help"
          })
      }
    })()
  }, [])

  switch (command) {
    case "new":
    case "plugin":
    case "schema":
      return (
        <Text color={state.errors ? "red" : "green"}>
          {state.errors || "Done."}
        </Text>
      )
    case "help":
    default:
      return (
        <Text>
          $ bunadmin --help Usage Create a new project
          {`\n`}$ bunadmin new [name]
          {`\n`}
          Options
          {`\n`} --plugin with demo plugin
          {`\n`} --doc with demo document Examples
          {`\n`}$ bunadmin new my-dashboard
          {`\n`} Your project "my-dashboard" has been created.
          {`\n`}
        </Text>
      )
  }
}

module.exports = UI
