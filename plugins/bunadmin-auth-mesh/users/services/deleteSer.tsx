import Type from "../types"
import { SchemaName } from "../plugin"
import { ENV, request, storedToken, notice } from "@bunred/bunadmin"

export default async function deleteSer(oldData: Type) {
  const token = await storedToken()

  const res = await request(`/${SchemaName}/${oldData.uuid}`, {
    prefix: ENV.AUTH_URL,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.error) {
    await notice({
      title: "Sorry, you can't delete this row",
      severity: "warning",
      content: JSON.stringify(oldData)
    })
  } else {
    await notice({
      title: "Successful",
      severity: "success"
    })
  }
}
