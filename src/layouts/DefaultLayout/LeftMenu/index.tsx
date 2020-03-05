import React, { useEffect, useState } from "react"

import Divider from "@material-ui/core/Divider"
import NestedList from "./NestedMenu"
import SettingMenu from "./SettingMenu"
import rxSubscribe from "@/utils/database/rxSubscribe"
import { Collection } from "@/core/menu/collections"
import { Type } from "@/core/menu/types"

const LeftMenu = () => {
  const [data, setData] = useState([] as Type[])

  useEffect(() => {
    ;(async () => {
      await rxSubscribe({
        collection: Collection.name,
        sort: { rank: "desc" },
        callback: data => {
          setData(data)
        }
      })
    })()
  }, [])

  return (
    <>
      <NestedList data={data} />
      <Divider />
      <SettingMenu />
    </>
  )
}

export default LeftMenu
