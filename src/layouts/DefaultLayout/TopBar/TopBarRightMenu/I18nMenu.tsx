import React from "react"

import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import EvaIcon from "react-eva-icons"
import { useTheme } from "@material-ui/core/styles"
import { useTranslation } from "react-i18next"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

export default function I18nMenu() {
  const { i18n } = useTranslation()
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const languages = [
    { code: "zh", name: "中文" },
    { code: "en", name: "English" }
  ]

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleI18n = ({ code }: { code: string }) => {
    i18n.changeLanguage(code)
    handleClose()
  }

  function handleClose() {
    setAnchorEl(null)
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
          name="globe-outline"
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
        {languages.map((item, index) => (
          <ListItem
            key={index}
            button
            onClick={() => handleI18n({ code: item.code })}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </Menu>
    </div>
  )
}
