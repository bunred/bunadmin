import React from "react"

import CommonTable from "../../src/components/CommonTable"
import { demoData } from "../../src/modules/local_data/left_menu/demo/data"
import { demoColumns } from "../../src/modules/local_data/left_menu/demo/columns"

export default function RxDbPage() {
  // @ts-ignore
  return (
    <CommonTable title="Local Data" columns={demoColumns} data={demoData} />
  )
}
