/**
 * Remote data controller
 */
import listSer from "../services/listSer"
import { DataCtrl } from "../types"
import { notice } from "@bunred/bunadmin"

export default async function dataCtrl({ query, SchemaName }: DataCtrl) {
  const { data, errors, totalCount } = await listSer({ query, SchemaName })

  if (errors) {
    await notice({
      title: "Fetch error",
      severity: "error",
      content: JSON.stringify(errors)
    })
    return {
      page: query.page,
      data: [],
      totalCount: 0
    }
  }

  return {
    page: query.page,
    data,
    totalCount: totalCount
  }
}
