import React, { useEffect, useState } from "react"
import { Text } from "ink"
import newProject from "./new"

type UIProps = {
  inputs: string[]
  options: { [key: string]: string }
}

type State = {
  type: "help" | "new" | "plugin"
  ready: boolean
  success: boolean
  projectName: string
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
    type: "help",
    ready: false,
    success: false,
    projectName: "my-bunadmin"
  })

  function updateState(obj: PickOne<State>) {
    setState({ ...state, ...obj })
  }

  const type = inputs[0]

  useEffect(() => {
    ;(async () => {
      switch (type) {
        case "new":
          {
            updateState({ type })
            const projectName = inputs[1] || "my-bunadmin"
            const success = await newProject(projectName)
            updateState({ projectName })
            updateState({ success })
          }
          break
        default:
          updateState({ success: false })
      }
    })()
  }, [])

  const { projectName } = state

  switch (type) {
    case "new":
      return (
        <>
          {state.success ? (
            <Text>
              Your project <Text color="green">{projectName}</Text> has been
              created.
            </Text>
          ) : (
            <Text>
              Creation failed, please try again or check the name
              <Text color="green">{projectName}</Text>.
            </Text>
          )}
        </>
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
