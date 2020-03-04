import React, {useEffect, useState} from "react"
import CommonSchema from "../../src/components/CommonSchema"
import DefaultLayout from "../../src/layouts/DefaultLayout"
import {useRouter} from "next/router"
import CorePages from "../../src/components/CorePages"
import SignInContainer from "../../src/components/User/SignIn"
import securityController from "../../src/modules/local_data/auth/controllers/securityController"
import CubeSpinner from "../../src/components/CommonBgs/CubeSpinner"
import {ParsedUrlQuery} from "querystring"

const ModulePage = () => {
  const [ready, setReady] = useState(false)
  const router = useRouter()
  const { group, name } = router.query as ParsedUrlQuery

  useEffect(() => {
    ;(async () => {
    if (!group || !name) return
    await securityController({ setReady, router })
    })()
  }, [group])

  if (!ready) return <CubeSpinner />

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