import React from "react"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import EvaIcon from "react-eva-icons"
import { useTheme } from "@material-ui/core/styles"
import { Collection } from "../../../../modules/local_data/auth/collections"
import rxDb from "../../../../utils/local_database/rxConnect"
import Divider from "@material-ui/core/Divider"
import { DynamicRoute, LocalDataRoute } from "../../../../utils/routes"
import { useRouter } from "next/router"

export default function UserMenu() {
  const theme = useTheme()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = ({ route }: { route?: string }) => {
    setAnchorEl(null)
    if (!route) return
    router.push(DynamicRoute, route).then(_r => {})
  }

  const handleLogout = async () => {
    // query user from local store
    const collection = Collection.name
    const db = await rxDb()

    const localUser = await db[collection]
      .findOne()
      .sort({ updated_at: "desc" })
      .exec()
    // remove local user
    await localUser.remove()

    handleClose({})
    location.reload()
  }

  return (
    // User Icon
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <EvaIcon
          name="person-outline"
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
        onClose={() => handleClose({})}
      >
        <MenuItem onClick={() => handleClose({})}>My Profile</MenuItem>
        <MenuItem onClick={() => handleClose({ route: LocalDataRoute.auth })}>
          Switch User
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
