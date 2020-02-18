import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import EvaIcon from "react-eva-icons"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { useTheme } from "@material-ui/core/styles"
import { topBarStyles } from "./styles"

const useStyles = topBarStyles

interface TopBarProps {
  menuClick: () => void
}

export default function TopBar(props: TopBarProps) {
  const { menuClick } = props
  const classes = useStyles()
  const theme = useTheme()

  return (
    <AppBar
      elevation={1}
      color="inherit"
      position="fixed"
      className={classes.appBar}
    >
      <Toolbar>
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
        <Typography variant="h6" noWrap>
          BunAdmin
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
