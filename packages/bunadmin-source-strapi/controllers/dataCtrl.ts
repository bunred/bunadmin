/**
 * Remote data controller
 */
import listSer from "../services/listSer"
import { DataCtrl, ListService } from "../types"
import { notice } from "@bunred/bunadmin"
import { QueryResult } from "material-table"

export default async function dataCtrl({
  t,
  listService,
  ...sharedProps
}: DataCtrl): Promise<QueryResult<any>> {
  const { path, tableQuery } = sharedProps

  let data: any,
    errors,
    totalCount = 0

  if (listService && path) {
    await notice({
      title: t("Only one of listService or path is needed"),
      severity: "error"
    })
    return {
      page: tableQuery.page,
      data: [],
      totalCount: 0
    }
  }

  if (!listService && !path) {
    await notice({
      title: t("One of the listService or path is required"),
      severity: "error"
    })
    return {
      page: tableQuery.page,
      data: [],
      totalCount: 0
    }
  }

  if (listService) {
    const resp = await listService()
    data = resp.data
    errors = resp.errors
    totalCount = resp.totalCount
  }

  if (path) {
    const listSerProps: ListService = {
      path,
      ...sharedProps
    }

    const resp = await listSer(listSerProps)
    data = resp.data
    errors = resp.errors
    totalCount = resp.totalCount
  }

  if (errors) {
    await notice({
      title: t("Request Failed"),
      severity: "error",
      content: JSON.stringify(errors)
    })
    return {
      page: tableQuery.page,
      data: [],
      totalCount: 0
    }
  }

  return {
    page: tableQuery.page,
    data,
    totalCount: totalCount
  }
}
