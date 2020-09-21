import React, { RefObject } from "react"
import { Column } from "material-table"
import Type from "./types"
import { SchemaName, ParentName } from "./plugin"
import { TFunction } from "i18next"
import {
  fixTreeDataTr,
  ParentSelector,
  CustomParentData,
  CustomParentSer
} from "@bunred/bunadmin"
import { filtersQuery } from "bunadmin-source-strapi"

async function queryParent(rowData: Type) {
  const res = await filtersQuery({
    SchemaName,
    filters: {
      "parent_category.id_null": true, // root categories
      id_ne: rowData.id // exclude self
    }
  })
  return {
    data: { [SchemaName]: res },
    errors: res.status ? "Fetch error" : undefined
  } as CustomParentData
}

export default ({ t, tableRef }: { t: TFunction; tableRef: RefObject<any> }) =>
  [
    {
      title: t("Id"),
      field: "id",
      editable: "never",
      width: 80
    },
    { title: t("Name"), field: "name", width: 115 },
    {
      title: t("Parent"),
      field: "parent",
      initialEditValue: "",
      grouping: false,
      width: 200,
      render: r => r.parent_category && r.parent_category.name,
      editComponent: props => {
        const tableEl = tableRef.current.tableContainerDiv
          .current as HTMLElement
        // fix tree data tr
        fixTreeDataTr(tableEl)

        return (
          <ParentSelector
            width={200}
            schemaName={SchemaName}
            parentName={ParentName}
            customParentSer={queryParent(props.rowData) as CustomParentSer}
            {...props}
          />
        )
      }
    },
    {
      title: t("Created At"),
      field: "created_at",
      editable: "never",

      defaultSort: "desc",
      width: 135,
      render: r => r && new Date(r.created_at).toLocaleString()
    },
    {
      title: t("Updated At"),
      field: "updated_at",
      editable: "never",
      width: 135,
      render: r => (r ? new Date(r.updated_at).toLocaleString() : "")
    },
    {
      title: t("Created At"),
      field: "created_at",
      editable: "never",
      defaultSort: "desc",
      width: 135,
      type: "datetime",
      filtering: false
    },
    {
      title: t("Updated At"),
      field: "updated_at",
      editable: "never",
      width: 135,
      type: "datetime",
      filtering: false
    }
  ] as Column<Type>[]
