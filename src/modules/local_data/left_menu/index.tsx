import React from "react"

import CommonTable from "../../../components/CommonTable"
import DefaultLayout from "../../../layouts/DefaultLayout"

import { Collection } from "./collections"
import { Schema } from "./schema"
import { Columns } from "./columns"

import { editableController } from "./controllers/editable_controller"
import { CommonTableDefaultProps as DefaultProps } from "../../../components/CommonTable/models/defaultProps"

export default function LocalLeftMenuContainer() {
  return (
    <DefaultLayout>
      <CommonTable
        collection={Collection.name}
        data={[]}
        columns={Columns}
        listTitle={Schema.title}
        editable={editableController()}
        parentChildData={(row, rows) => rows.find(a => a.name === row.parent)}
        options={{ ...DefaultProps.options, selection: false }}
        actions={[]}
      />
    </DefaultLayout>
  )
}
