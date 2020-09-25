/**
 * Remote data controller
 */
import { ENV, request, storedToken, store, TableState } from "@bunred/bunadmin"
import { ListService } from "../types"
import { SchemaName } from "pcode-bunadmin-plugin/code/plugin"

const eq = "_eq"

export default async function listSer({
  name,
  fields,
  tableQuery,
  path = "graphql",
  prefix,
  skipCount,
  searchField = "name",
  searchSuffix = "_like"
}: ListService) {
  const {
    search: searchWords,
    filters = [],
    orderBy,
    orderDirection,
    page,
    pageSize
  } = tableQuery

  let filtersObj: any = {}
  filters.map(({ column, value: filterValue }) => {
    let suffix = "_like" // default: like

    if (!column.field) return
    const field = column.field.toString()

    const state = store.getState()
    const table: TableState = state.table
    let filterField = field

    const extraFilter = table.filters?.find(
      item => item.column?.field === field
    )

    if (extraFilter && extraFilter.filterField) {
      filterField = extraFilter.filterField
    }

    if (extraFilter && typeof extraFilter.filterOperator === "string") {
      suffix = extraFilter.filterOperator
    }

    if (typeof filterValue === "object") {
      suffix = "_in"
      // fix value: []
      if (filterValue.length === 0) suffix = "_nin"
    }

    // handling numeric column
    if (column.type === "numeric") suffix = eq

    // handling boolean column
    if (column.type === "boolean") {
      suffix = eq
      if (filterValue === "checked") filterValue = true
      if (filterValue === "unchecked") filterValue = false
    }

    if (suffix === "_like") filterValue = `%${filterValue}%`

    filtersObj[filterField] = { [suffix]: filterValue }
  })

  filtersObj[searchField] = { [searchSuffix]: `%${searchWords || ""}%` }

  const orderByField =
    (orderBy && orderBy.field && orderBy.field.toString()) || "id"

  const variables = {
    offset: page * pageSize,
    limit: pageSize,
    order_by: orderBy ? { [orderByField]: orderDirection } : undefined,
    where: filtersObj
  }

  const graphql = `
    query MyQuery($offset: Int = 0, $limit: Int = 10, $order_by: [code_order_by!] = {}, $where: code_bool_exp = {}) {
      ${name}(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
      ${fields}
    }
      ${name}_aggregate {
        aggregate {
          count
        }
      }
    }
  `

  const token = await storedToken()

  let { data, errors } = await request(`/${path}`, {
    prefix: prefix || ENV.MAIN_URL,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: JSON.stringify({ query: graphql, variables })
  })
  const arrayList = data && data[SchemaName]

  let count = arrayList ? arrayList.length : 0
  if (!skipCount)
    count =
      data &&
      data[`${name}_aggregate`] &&
      data[`${name}_aggregate`]["aggregate"]["count"]

  return {
    data: arrayList || [],
    totalCount: count,
    errors: errors ? errors[0] : data && data.error ? data.error : undefined
  }
}
