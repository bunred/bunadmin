import { EditableCtrl } from "../types"
import { ENV, request, storedToken, notice } from "@bunred/bunadmin"

interface Props<RowData> extends EditableCtrl {
  oldData: RowData
}

export default async function deleteSer({ oldData, SchemaName }: Props<any>) {
  const token = await storedToken()

  const res = await request(`/${SchemaName}/${oldData.id}`, {
    prefix: ENV.AUTH_URL,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.error) {
    await notice({
      title: "Sorry, you can't delete this item",
      severity: "warning",
      content: JSON.stringify(oldData)
    })
  } else {
    await notice({
      title: "Successful",
      severity: "success"
    })
  }

  return res
}
