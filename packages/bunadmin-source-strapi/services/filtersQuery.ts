/**
 * Remote data controller
 */
import { ENV, request, storedToken } from "@bunred/bunadmin"

export default async function filtersQuery({
  SchemaName,
  filters
}: {
  SchemaName: string
  filters?: any
}) {
  const token = await storedToken()

  const params = {
    ...filters,
    _sort: "created_at:DESC",
    _limit: 30,
    _start: 0
  }

  return await request(
    `/content-manager/explorer/application::${SchemaName}.${SchemaName}`,
    {
      params,
      prefix: ENV.AUTH_URL,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}
