import ParentSelect from "../components/ParentSelect"
import React from "react"
import { EditComponentProps } from "material-table"
import { LeftMenuType } from "../types"

export default function editComponentController(
  props: EditComponentProps<LeftMenuType>
) {
  return <ParentSelect {...props} />
}
