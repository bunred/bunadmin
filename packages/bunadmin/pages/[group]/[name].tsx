import React, { useEffect, useState } from "react"
import CommonSchema from "@/components/CommonSchema"
import DefaultLayout from "@/layouts/DefaultLayout"
import { useRouter } from "next/router"
import CorePages from "@/components/CorePages"
import CubeSpinner from "@/components/CommonBgs/CubeSpinner"
import { ParsedUrlQuery } from "querystring"
import CommonError from "@/components/CommonError"
import { ENV } from "../../src/utils/config";

const ModulePage = () => {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const { group, name } = router.query as ParsedUrlQuery

  function showError(msg: string) {
    setReady(true)
    setError(true)
    setErrorMsg(msg)
  }

  useEffect(() => {
    ;(async () => {
      if (!group || !name) return // waiting or not exists
      // return showError(`group or name not exists`)

      try {
        // @ts-ignore & ENV.AUTH_PLUGIN undefined
        let { security } = await import(`@plugins/${process.env.NEXT_PUBLIC_AUTH_PLUGIN}`)
        if (!security)
          return showError(`security required '@plugins/${ENV.AUTH_PLUGIN}'`)
        setError(false)
        await security({ setReady, router })
      } catch (e) {
        showError(e.toString())
      }
    })()
  }, [group])

  if (!ready) return <CubeSpinner />

  let render

  switch (group) {
    case "core":
      render = <CorePages />
      break
    case "auth":
      switch (name) {
        case "sign-in":
        case "sign-up":
        case "recovery":
          // skipped Layout
          return <CommonSchema isAuthPath={true} />
        default:
          render = <CommonSchema />
      }
      break
    default:
      render = <CommonSchema />
  }

  if (error)
    render = (
      <CommonError statusCode={403} hasLayout={false} message={`${errorMsg}`} />
    )

  return <DefaultLayout>{render}</DefaultLayout>
}

export default ModulePage