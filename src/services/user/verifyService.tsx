import request from "@/utils/scripts/request"
import storedToken from "@/utils/scripts/storedToken"

async function verifyService(): Promise<any> {
  const token = await storedToken()

  // query remote user with token
  return request("/auth/me", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export default verifyService
