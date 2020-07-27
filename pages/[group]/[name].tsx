import React, { useEffect, useState } from "react"
import CommonSchema from "@/components/CommonSchema"
import DefaultLayout from "@/layouts/DefaultLayout"
import { useRouter } from "next/router"
import CorePages from "@/components/CorePages"
import CubeSpinner from "@/components/CommonBgs/CubeSpinner"
import { ParsedUrlQuery } from "querystring"
import CommonError from "@/components/CommonError"

const ModulePage = () => {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const { group, name } = router.query as ParsedUrlQuery

  function showError () {
    setReady(true)
    setError(true)
  }

  useEffect(() => {
    ;(async () => {
      if (!group || !name) return showError()
      const bunadminUserPath = 'buncms-user'
      try {
        const security = await import(`@plugins/${bunadminUserPath}/utils/security`)
        if (!security) return showError()
        await security({ setReady, router })
      } catch (e) {
        showError()
      }
    })()
  }, [group])

  if (!ready) return <CubeSpinner />

  let render

  switch (group) {
    case "core":
      render = <CorePages />
      break
    case "user":
      switch (name) {
        case "sign-in": case "sign-up": case "recovery":
          // skipped Layout
          return <CommonSchema isAuthPath={true} />
        default:
          render = <CommonSchema />
      }
      break
    default:
      render = <CommonSchema />
  }

  if (error) render = (
    <CommonError
      statusCode={403}
      hasLayout={false}
      message={"Errors: buncms-user/utils/security"}
    />
  )

  return <DefaultLayout>{render}</DefaultLayout>
}

export default ModulePage
