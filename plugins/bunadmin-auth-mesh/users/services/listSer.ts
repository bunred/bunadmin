/**
 * Remote data controller
 */
import { Query } from "material-table"
import { ENV, request, storedToken } from "@bunred/bunadmin"
import { SchemaName } from "../plugin"

export default async function listSer(query: Query<any>) {
  const { page, pageSize } = query
  const token = await storedToken()

  const { data, _metainfo } = await request(`/${SchemaName}`, {
    params: { page: page + 1, perPage: pageSize, _sort: "username:ASC" },
    prefix: ENV.AUTH_URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return {
    data,
    totalCount: _metainfo ? _metainfo.totalCount : 0,
    errors: data.status >= 400 ? "Fetch error" : undefined
  }
}
