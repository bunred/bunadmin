import React from "react"
import CommonSchema from "@/components/CommonSchema"
import DefaultLayout from "@/layouts/DefaultLayout"
import { useRouter } from "next/router"
import CorePages from "@/components/CorePages"
import { ParsedUrlQuery } from "querystring"
import { ENV } from "@/utils"

const ModulePage = () => {
  const router = useRouter()

  const { group, name } = router.query as ParsedUrlQuery

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

  const path = `/${group}/${name}`
  if (ENV.PATHS_WITHOUT_LAYOUT?.includes(path)) return render

  return <DefaultLayout>{render}</DefaultLayout>
}

export default ModulePage
