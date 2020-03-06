import { Dispatch, SetStateAction } from "react"
import { NextRouter } from "next/router"
import verifyService from "@/services/user/verifyService"
import { DynamicRoute, UserRoute } from "@/utils/routes"

const delayMS = 600 // delay setting ready (ms)

interface Props {
  setReady: Dispatch<SetStateAction<boolean>>
  router: NextRouter
}

const isIgnoredPaths = (asPath: string) => {
  return asPath.indexOf(UserRoute.signIn) > -1
}

async function securityController({ setReady, router }: Props) {
  function delayReady() {
    setTimeout(() => setReady(true), delayMS)
  }
  const { asPath } = router

  if (isIgnoredPaths(asPath)) {
    delayReady()
  }

  const userProfile = await verifyService()
  // Authentication rule (check profile & id exists)
  const isVerified = userProfile && userProfile.id

  if (isVerified) {
    delayReady()
  } else {
    // const isIgnoredOrigins = asPath.indexOf(`?redirect=${asPath}`) > -1
    let toUrl = `${UserRoute.signIn}?redirect=${asPath}`
    toUrl = toUrl.replace(`?redirect=${UserRoute.signIn}`, "")
    router.replace(DynamicRoute, toUrl).then(_r => setReady(true))
  }
}

export default securityController
