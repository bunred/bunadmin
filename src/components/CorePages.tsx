import React from "react"
import { useRouter } from "next/router"
import LocalLeftMenuContainer from "../modules/local_data/left_menu"
import MigrationContainer from "../modules/local_data/migration"
import LocalNoticeContainer from "../modules/local_data/notice"
import SchemaManagerContainer from "../modules/local_data/schema"

export default function CorePages() {
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
      container = <LocalNoticeContainer />
      break
    case "schema":
      container = <SchemaManagerContainer />
      break
  }

  return <>{container}</>
}
