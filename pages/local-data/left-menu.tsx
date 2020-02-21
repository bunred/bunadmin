import React, { useState } from "react"

import CommonTable from "../../src/components/CommonTable"
import { leftMenuColumns } from "../../src/modules/local_data/left_menu/columns"
import { editableController } from "../../src/modules/local_data/left_menu/controllers/editable_controller"
import rxSubscribe from "../../src/utils/local_database/rxSubscribe"

export default function RxDbPage() {
  const [data, setData] = useState([])

  React.useEffect(() => {
    ;(async () => {
      await rxSubscribe({
        collection: "left_menu",
        sort: { rank: "desc" },
        callback: data => setData(data)
      })
    })()
  }, [])

  return (
    <CommonTable
      title="Local Data"
      columns={leftMenuColumns}
      data={data}
      editable={editableController()}
      parentChildData={(row, rows) => rows.find(a => a.name === row.parent)}
    />
  )
}
