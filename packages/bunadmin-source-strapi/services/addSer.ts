import { EditableCtrl } from "../types"
import { ENV, request, storedToken, notice } from "@bunred/bunadmin"

interface Props<RowData> extends EditableCtrl {
  newData: RowData
}

export default async function addSer({ newData, SchemaName }: Props<any>) {
  const token = await storedToken()

  const res = await request(`/${SchemaName}.${SchemaName}`, {
    prefix: ENV.MAIN_URL,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: newData
  })

  if (res.error) {
    await notice({
      title: "Sorry, you can't update this post",
      severity: "warning",
      content: JSON.stringify(newData)
    })
  } else {
    await notice({
      title: "Successful",
      severity: "success"
    })
  }
}
