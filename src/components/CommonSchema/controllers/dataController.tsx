/**
 * Remote data controller
 */
import { Query, QueryResult } from "material-table"
import request from "@/utils/scripts/request"
import { ENV } from "@/utils/config"

const dataController = (query: Query<any>) =>
  new Promise(resolve => {
    request(`/user?page=${query.page + 1}&pageSize=${query.pageSize}`, {
      prefix: ENV.AUTH_URL,
      method: "GET",
      responseType: "text"
    }).then(result => {
      const JSONBigInt = require("json-bigint")
      result = JSONBigInt.parse(result)

      resolve({
        data: result.data,
        page: result.page - 1,
        totalCount: result.total
      })
    })
  }) as Promise<QueryResult<any>>

export default dataController
