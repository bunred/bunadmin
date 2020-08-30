/**
 * Remote data controller
 */
import { Query } from "material-table"
import { ENV, request, storedToken } from "@bunred/bunadmin"
import { SchemaName } from "../plugin"

export default async function listSer(query: Query<any>) {
  const { search, page, pageSize } = query
  const token = await storedToken()

  const defSearchField = "name"

  let searchField = `${defSearchField}_contains`

  const params = {
    [searchField]: search || "",
    _limit: pageSize,
    _sort: "created_at:DESC",
    _start: page * pageSize
  }

  const data = await request(`/upload/${SchemaName}`, {
    params,
    prefix: ENV.AUTH_URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const count = await request(`/upload/${SchemaName}/count`, {
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
