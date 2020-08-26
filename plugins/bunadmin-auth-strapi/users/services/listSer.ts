/**
 * Remote data controller
 */
import { Query } from "material-table"
import { ENV, request, storedToken } from "@bunred/bunadmin"
import { SchemaName } from "../plugin"

export default async function listSer(query: Query<any>) {
  const { page, pageSize } = query
  const token = await storedToken()

  const data = await request(`/${SchemaName}`, {
    params: { _limit: pageSize, _sort: "username:ASC", _start: page },
    prefix: ENV.AUTH_URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { count } = await request(`/${SchemaName}/count`, {
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
