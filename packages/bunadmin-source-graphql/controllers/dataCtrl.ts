/**
 * Remote data controller
 */
import graphqlSer from "../services/graphqlSer"
import { DataCtrl } from "../types"

export default async function dataCtrl({
  SchemaName,
  tableQuery,
  query
}: DataCtrl) {
  const { page, pageSize } = tableQuery

  const variables = {
    limit: pageSize,
    offset: pageSize * page
  }

  const { data: res, errors } = await graphqlSer({ query, variables })

  if (errors) {
    return {
      page: page,
      data: [],
      totalCount: 0
    }
  }

  const data = res && res[SchemaName]
  const totalCount =
    res &&
    res[`${SchemaName}_aggregate`] &&
    res[`${SchemaName}_aggregate`]["aggregate"]["count"]

  return {
    page: page,
    data: data,
    totalCount: totalCount
  }
}
