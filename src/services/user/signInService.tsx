import bunadminConfig from "@/utils/config/bunadminConfig"
import request from "@/utils/scripts/request"

export interface SignInParamsType {
  username: string
  password: string
}

async function userSignInService(params: SignInParamsType) {
  return request("/auth/login", {
    prefix: bunadminConfig.userUrl,
    method: "POST",
    data: params
  })
}

export default userSignInService
