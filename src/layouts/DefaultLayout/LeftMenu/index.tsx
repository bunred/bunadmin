import React from "react"

import Divider from "@material-ui/core/Divider"
import NestedList from "./NestedMenu"
import SettingMenu from "./SettingMenu"
import { Type } from "@/core/menu/types"
import { ENV } from "@/utils/config"
import { useSelector } from "react-redux"
import { selectNestedMenu } from "@/slices/nestedMenuSlice"

export interface LeftMenuProps {
  data?: Type[]
  offLeftSetting?: boolean
}

const LeftMenu = ({ data: propsData, offLeftSetting }: LeftMenuProps) => {
  const menus = useSelector(selectNestedMenu)

  return (
    <>
      <NestedList data={propsData || menus} />
      <Divider />
      {!offLeftSetting && ENV.ON_SETTING && <SettingMenu />}
    </>
  )
}

export default LeftMenu
