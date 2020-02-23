import ParentSelect from "../components/ParentSelect"
import React from "react"
import { EditComponentProps } from "material-table"
import { Type } from "../types"

export default function editComponentController(
  props: EditComponentProps<Type>
) {
  return <ParentSelect {...props} />
}
