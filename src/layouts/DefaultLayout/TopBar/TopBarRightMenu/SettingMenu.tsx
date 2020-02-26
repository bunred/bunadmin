import React, { useState } from "react"
import RxDB from "rxdb"

import { useRouter } from "next/router"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import EvaIcon from "react-eva-icons"
import { useTheme } from "@material-ui/core/styles"
import { LocalDataRoute } from "../../../../utils/routes"
import ConfirmDialog from "../../../../components/CommonDialog/ConfirmDialog"

export default function SettingMenu() {
  const theme = useTheme()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [modalState, setModalState] = useState({
    open: 0,
    title: "",
    msg: ""
  })

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = ({ route }: { route: string }) => {
    setAnchorEl(null)
    if (!route) return
    router.push(route).then(_r => {})
  }

  const handleClearDb = () => {
    setAnchorEl(null)
    setModalState({
      title: "Delete Local Database",
      open: modalState.open + 1,
      msg: "Do want to delete the local database?"
    })
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
          Menu Setting
        </MenuItem>
        <MenuItem onClick={() => handleClose({ route: LocalDataRoute.schema })}>
          Schema Manager
        </MenuItem>
        <MenuItem
          onClick={() => handleClose({ route: LocalDataRoute.migration })}
        >
          Data Migration
        </MenuItem>
        <MenuItem onClick={() => handleClose({ route: "/" })}>
          Theme Setting
        </MenuItem>
        <MenuItem onClick={() => handleClearDb()}>
          Reset Local Database
        </MenuItem>
      </Menu>
      {/* ConfirmDialog */}
      <ConfirmDialog
        openModal={modalState.open}
        title={modalState.title}
        msg={modalState.msg}
        doFunc={() => {
          RxDB.removeDatabase("bunadmin", "idb").then(_r => location.reload())
        }}
      />
    </div>
  )
}
