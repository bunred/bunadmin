import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import EvaIcon from "react-eva-icons"
import React from "react"
import { useTheme } from "@material-ui/core/styles"
import { topBarStyles } from "./styles"
import UserMenu from "./TopBarRightMenu/UserMenu"
import SettingMenu from "./TopBarRightMenu/SettingMenu"
import NoticeMenu from "./TopBarRightMenu/NoticeMenu"
import I18nMenu from "@/components/TopBar/TopBarRightMenu/I18nMenu"
import { ENV } from "@/utils/config"
import DocMenu from "./TopBarRightMenu/DocMenu"
import { useRouter } from "@/router"
import { DynamicDocRoute } from "@/utils/routes"
import { NoticePlugin } from "@/utils"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"

const useStyles = topBarStyles

type TopBarProps = {
  menuClick: () => void
  docsHome?: string
} & NoticePlugin

export default function TopBar(props: TopBarProps) {
  const { menuClick, notificationCount } = props
  const classes = useStyles()
  const theme = useTheme()
  const router = useRouter()
  const isDoc = router.route === DynamicDocRoute
  const docsHome = props.docsHome || "/docs/getting-started/introduction"

  return (
    <AppBar
      elevation={1}
      color="inherit"
      position="fixed"
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftBlock}>
          {!isDoc && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={menuClick}
              className={classes.menuButton}
            >
              <EvaIcon
                name="menu-2-outline"
                size="xlarge"
                fill={theme.bunadmin.iconColor}
              />
            </IconButton>
          )}
          <Button
            variant={"text"}
            size="large"
            color="primary"
            component={Link}
            to={!isDoc ? "/" : docsHome}
          >
            {!isDoc ? ENV.SITE_NAME : ENV.SITE_NAME + " DOCS"}
          </Button>
        </div>

        <div className={classes.rightBlock}>
          {!isDoc && (
            <>
              <NoticeMenu notificationCount={notificationCount} />
              <UserMenu />
              {ENV.ON_SETTING && <SettingMenu />}
            </>
          )}
          {ENV.ON_I18N && <I18nMenu />}
          {ENV.ON_DOC && <DocMenu isDoc={isDoc} docsHome={docsHome} />}
        </div>
      </Toolbar>
    </AppBar>
  )
}
