import { EditableCtrl } from "../types"
import { ENV, request, storedToken, notice } from "@bunred/bunadmin"

interface Props<RowData> extends EditableCtrl {
  newData: RowData
  oldData: RowData
}

export default async function updateSer({
  newData,
  oldData,
  SchemaName
}: Props<any>) {
  const token = await storedToken()

  const res = await request(`/${SchemaName}/${oldData.id}`, {
    prefix: ENV.MAIN_URL,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: newData
  })

  if (res.error) {
    await notice({
      title: "Sorry, you can't update this post",
      severity: "warning",
      content: JSON.stringify(oldData)
    })
  } else {
    await notice({
      title: "Successful",
      severity: "success"
    })
  }
}
