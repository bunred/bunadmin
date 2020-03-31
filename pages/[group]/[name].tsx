import React, { useEffect, useState } from "react"
import CommonSchema from "@/components/CommonSchema"
import DefaultLayout from "@/layouts/DefaultLayout"
import { useRouter } from "next/router"
import CorePages from "@/components/CorePages"
import securityController from "@/core/auth/controllers/securityController"
import CubeSpinner from "@/components/CommonBgs/CubeSpinner"
import { ParsedUrlQuery } from "querystring"

const ModulePage = () => {
  const router = useRouter()
  const [ready, setReady] = useState(false)
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

  return <DefaultLayout>{render}</DefaultLayout>
}

export default ModulePage
