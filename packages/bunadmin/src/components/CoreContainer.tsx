import React from "react"
import { useRouter } from "@/router"
import LocalLeftMenuContainer from "@/core/menu"
import MigrationContainer from "@/core/migration"
import NoticeContainer from "@/core/notice"
import SchemaManagerContainer from "@/core/schema"
import AuthInfoContainer from "@/core/auth"
import BunadminSettingContainer from "@/core/setting"
import { NoticePlugin } from "@/utils"

type Props = {} & NoticePlugin

export default function CoreContainer(props: Props) {
  const router = useRouter()
  const { name } = router.query

  let container = null

  switch (name) {
    case "left-menu":
      container = <LocalLeftMenuContainer />
      break
    case "migration":
      container = <MigrationContainer />
      break
    case "notice":
      container = <NoticeContainer {...props} />
      break
    case "schema":
      container = <SchemaManagerContainer />
      break
    case "auth":
      container = <AuthInfoContainer />
      break
    case "setting":
      container = <BunadminSettingContainer />
  }

  return <>{container}</>
}
