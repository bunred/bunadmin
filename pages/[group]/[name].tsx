import React, {useEffect, useState} from "react"
import CommonSchema from "../../src/components/CommonSchema"
import DefaultLayout from "../../src/layouts/DefaultLayout"
import {useRouter} from "next/router"
import CorePages from "../../src/components/CorePages"
import SignInContainer from "../../src/components/User/SignIn"

interface Interface {
  group: string
  name: string
}

const ModulePage = () => {
  const [ready, setReady] = useState(false)
  const router = useRouter()
  const { group, name } = (router.query as unknown) as Interface

  useEffect(() => {
    if (!group || !name) return
    setReady(true)
  }, [group])

  if (!ready) return null

  let render

  switch (group) {
    case "core":
      render = <CorePages/>
      break
    case "user":
      switch (name) {
        case "sign-in":
          return <SignInContainer />
      }
      break
    default:
      render = <CommonSchema />
  }

  return (
    <DefaultLayout>
      {render}
    </DefaultLayout>
  )
}

export default ModulePage