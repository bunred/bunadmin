import {
  EditableCtrl,
  ENV,
  request,
  storedToken,
  notice
} from "@bunred/bunadmin"

interface Props<RowData> extends EditableCtrl {
  changes: {
    newData: RowData
    oldData: RowData
  }[]
}

export default async function bulkUpdateSer({
  t,
  SchemaName,
  primaryKey = "id",
  changes
}: Props<any>) {
  const token = await storedToken()

  const resList: any[] = []
  let successCount = 0
  let failCount = 0
  changes = Object.values(changes)
  for (let i = 0; i < changes.length; i++) {
    const { oldData, newData } = changes[i]
    const gql = `
    mutation MyMutation {
      __typename
      update_${SchemaName}(where: {${primaryKey}: {_eq: "${oldData.id}"}}, _set: ${newData}) {
        affected_rows
      }
    }
  `

    const res = await request("/graphql", {
      prefix: ENV.MAIN_URL,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: JSON.stringify({ query: gql })
    })
    resList.push(resList)

    const { errors } = res

    if (errors) {
      await notice({
        title: t("Save Failed"),
        severity: "error",
        content: JSON.stringify({ errors, newData })
      })
      failCount++
    } else {
      successCount++
    }

    if (i + 1 === changes.length) {
      const successMsg = successCount > 0 ? `, ${successCount} success` : ""
      const failedMsg = failCount > 0 ? `, ${failCount} failure.` : ""
      await notice({
        title: t(`Batch Request Completed`),
        severity:
          successCount === changes.length
            ? "success"
            : failCount === changes.length
            ? "error"
            : "info",
        content: `${changes.length} items ${successMsg}${failedMsg}`
      })
    }
  }

  return resList
}
