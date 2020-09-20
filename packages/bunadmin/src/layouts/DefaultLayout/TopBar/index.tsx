import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import EvaIcon from "react-eva-icons"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { useTheme } from "@material-ui/core/styles"
import { topBarStyles } from "./styles"
import UserMenu from "./TopBarRightMenu/UserMenu"
import SettingMenu from "./TopBarRightMenu/SettingMenu"
import Link from "@/components/Link"
import NoticeMenu from "./TopBarRightMenu/NoticeMenu"
import I18nMenu from "@/layouts/DefaultLayout/TopBar/TopBarRightMenu/I18nMenu"
import { ENV } from "@/utils/config"
import DocMenu from "./TopBarRightMenu/DocMenu"
import { useRouter } from "next/router"
import { DynamicDocRoute } from "@/utils/routes"

const useStyles = topBarStyles

interface TopBarProps {
  menuClick: () => void
}

export default function TopBar(props: TopBarProps) {
  const { menuClick } = props
  const classes = useStyles()
  const theme = useTheme()
  const router = useRouter()
  const isDoc = router.route === DynamicDocRoute
  const docsHome = "/docs/getting-started/introduction"

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
          <Link href={!isDoc ? "/" : docsHome}>
            <Typography variant="h6" noWrap>
              {!isDoc ? ENV.SITE_NAME : ENV.SITE_NAME + " DOCS"}
            </Typography>
          </Link>
        </div>

        <div className={classes.rightBlock}>
          {!isDoc && (
            <>
              <NoticeMenu />
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
