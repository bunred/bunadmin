import { Values } from "../types"
import userSignInService from "../services/signInService"
import profileService from "../services/profileService"

import {
  rxDb,
  Setting,
  Auth,
  AuthPrimary as Primary,
  DynamicRoute,
  notice,
  Router
} from "@bunred/bunadmin"
import { TFunction } from "i18next"

interface Props {
  t: TFunction
  values: Values
  setSubmitting: (isSubmitting: boolean) => void
  router: Router
}

const submitController = async ({
  t,
  values,
  setSubmitting,
  router
}: Props) => {
  let res = await userSignInService(values)
  setSubmitting(false)
  // Sign-in successfully
  if (res && res.token) {
    const token = res.token
    res = await profileService(token)

    // store user profile
    const primary = Primary
    const updated_at = Date.now()

    const db = await rxDb()
    // store auth
    await db[Auth.name].upsert({
      [primary]: res.username,
      token,
      role: res.admin ? "admin" : res.groups.values(),
      details: JSON.stringify(res),
      updated_at
    })
    // update username in setting
    await db[Setting.name].upsert({
      name: Primary,
      value: res.username,
      updated_at: Date.now()
    })
    // show notice
    await notice({ title: t("Sign in successful") })
    // push to origin url
    const { asPath } = router
    const pathArr = asPath.split("?redirect=")
    const redirect = pathArr[1] || "/"
    const regex = /\//g
    const matchStr: RegExpMatchArray = redirect.match(regex) || []
    // is match /[group]/[name]
    const isMatch = matchStr.length === 2

    if (regex && isMatch) {
      router.replace(DynamicRoute, redirect)
    } else {
      router.replace(redirect)
    }
  } else {
    // show notice
    await notice({
      title: t("Sign in failed"),
      severity: "error",
      content: JSON.stringify(res)
    })
  }
}

export default submitController
