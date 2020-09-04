import { request, storedToken, ENV } from "@bunred/bunadmin"

async function profileService(token?: string): Promise<any> {
  if (!token) token = await storedToken()

  // query remote user with token
  return request("/auth/me", {
    prefix: ENV.AUTH_URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export default profileService
