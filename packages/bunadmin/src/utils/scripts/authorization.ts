import {
  AuthProps,
  DynamicDocRoute,
  DynamicRoute,
  ENV,
  request,
  storedToken,
  UserRoute
} from "@/utils"

export default async function authorization({
  router,
  authResponseKey = "id",
  authRequestUrl = "/auth/me",
  authRequestMethod = "GET"
}: AuthProps): Promise<boolean> {
  const { asPath } = router

  if (ENV.PATHS_WITHOUT_AUTH?.includes(asPath)) return true

  const response = await authService()
  const isVerified = response && response[authResponseKey]

  if (isVerified) {
    return true
  } else {
    let toUrl = `${UserRoute.signIn}?redirect=${asPath}`
    toUrl = toUrl.replace(`?redirect=${UserRoute.signIn}`, "")
    toUrl = toUrl.replace(`?redirect=${DynamicRoute}`, "/")
    toUrl = toUrl.replace(`?redirect=${DynamicDocRoute}`, "/")
    await router.replace(DynamicRoute, toUrl)
    return false
  }

  async function authService(token?: string): Promise<any> {
    if (!token) token = await storedToken()

    // query remote user with token
    return request(authRequestUrl, {
      prefix: ENV.AUTH_URL,
      method: authRequestMethod,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
