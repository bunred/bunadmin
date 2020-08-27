/**
 * Remote data controller
 */
import { ENV, request, storedToken } from "@bunred/bunadmin"
import { DataCtrl } from "../types"

export default async function listSer({ query, SchemaName }: DataCtrl) {
  const { search, page, pageSize } = query
  // const { search, page, pageSize, filters } = query
  // todo filters
  const token = await storedToken()

  const defSearchField = "name"

  let searchField = `${defSearchField}_contains`

  const params = {
    [searchField]: search || "",
    _limit: pageSize,
    _sort: "created_at:DESC",
    _start: page * pageSize
  }

  const data = await request(`/${SchemaName}`, {
    params,
    prefix: ENV.AUTH_URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const count = await request(`/${SchemaName}/count`, {
    params,
    prefix: ENV.AUTH_URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return {
    data,
    totalCount: count,
    errors: data.status >= 400 ? "Fetch error" : undefined
  }
}
