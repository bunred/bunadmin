import React from "react"

import { useRouter } from "next/router"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import EvaIcon from "react-eva-icons"
import { useTheme } from "@material-ui/core/styles"
import { LocalDataRoute } from "../../../../utils/routes"

export default function SettingMenu() {
  const theme = useTheme()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = ({ route }: { route: string }) => {
    setAnchorEl(null)
    if (!route) return
    router.push(route).then(_r => {})
  }

  return (
    // Setting Icon
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <EvaIcon
          name="settings-outline"
          size="large"
          fill={theme.bunadmin.iconColor}
        />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => handleClose({ route: LocalDataRoute.leftMenu })}
        >
          Local Menu
        </MenuItem>
        <MenuItem onClick={() => handleClose({ route: LocalDataRoute.notice })}>
          Local Notice
        </MenuItem>
        <MenuItem onClick={() => handleClose({ route: "/" })}>
          Theme Setting
        </MenuItem>
      </Menu>
    </div>
  )
}
