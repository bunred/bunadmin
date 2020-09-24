import { EditableCtrl } from "../types"
import { ENV, request, storedToken, notice } from "@bunred/bunadmin"

interface Props<RowData> extends EditableCtrl {
  changes: {
    newData: RowData
    oldData: RowData
  }[]
}

export default async function bulkUpdateSer({
  SchemaName,
  changes
}: Props<any>) {
  const token = await storedToken()

  const resList: any[] = []
  let successCount = 0
  let failCount = 0
  changes = Object.values(changes)
  for (let i = 0; i < changes.length; i++) {
    const { oldData, newData } = changes[i]
    const res = await request(`/${SchemaName}/${oldData.id}`, {
      prefix: ENV.AUTH_URL,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: newData
    })
    resList.push(resList)

    if (res.error) {
      await notice({
        title: `Sorry, you can't update this post ${oldData.id}`,
        severity: "warning",
        content: JSON.stringify(oldData)
      })
      failCount++
    } else {
      successCount++
    }

    if (i + 1 === changes.length) {
      const successMsg = successCount > 0 ? `, ${successCount} success` : ""
      const failedMsg = failCount > 0 ? `, ${failCount} failure.` : ""
      await notice({
        title: `Bulk Updated ${changes.length} items completed${successMsg}${failedMsg}`,
        severity:
          successCount === changes.length
            ? "success"
            : failCount === changes.length
            ? "error"
            : "info"
      })
    }
  }

  return resList
}
