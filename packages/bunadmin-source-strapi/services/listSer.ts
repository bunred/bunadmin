/**
 * Remote data controller
 */
import { ENV, request, storedToken } from "@bunred/bunadmin"
import { ListService } from "../types"

export default async function listSer({
  tableQuery,
  path,
  skipCount,
  searchField
}: ListService) {
  const {
    search: searchWords,
    filters,
    orderBy,
    orderDirection,
    page,
    pageSize
  } = tableQuery

  let filtersObj: any = {}
  filters.map(({ column, operator, value }) => {
    if (!column.field) return
    const suffix = handleOperator(operator)
    const field = column.field
    const filterKey = field.toString() + "_" + suffix
    filtersObj[filterKey] = value
  })

  searchField = searchField ? `${searchField}_contains` : "name_contains"

  const orderByField =
    (orderBy && orderBy.field && orderBy.field.toString()) || "created_at"

  const params = {
    [searchField]: searchWords || "",
    _limit: pageSize,
    _sort: orderBy ? `${orderByField}:${orderDirection}` : undefined,
    _start: page * pageSize,
    ...filtersObj
  }

  const token = await storedToken()

  const data = await request(`/${path}`, {
    params,
    prefix: ENV.AUTH_URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  let count = data.length || 0
  if (!skipCount)
    count = await request(`/${path}/count`, {
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
    errors: data.error ? data.error : undefined
  }
}

function handleOperator(operator: string): string {
  let suffix = "contains"
  switch (operator) {
    case "=":
      suffix = "contains"
      break
    case "==":
      suffix = "eq"
      break
    case "<>":
      suffix = "in"
      break
    case ">=":
      suffix = "gte"
      break
    case ">":
      suffix = "gt"
      break
    case "<=":
      suffix = "lte"
      break
    case "<":
      suffix = "lt"
      break
  }
  return suffix
}
