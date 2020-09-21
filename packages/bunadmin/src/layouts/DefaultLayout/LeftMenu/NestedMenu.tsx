import React, { useEffect, useState } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import { Type } from "@/core/menu/types"
import MenuIcon from "./MenuIcon"
import { useRouter } from "next/router"
import { DynamicRoute, DynamicDocRoute } from "@/utils/routes"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import { useTranslation } from "react-i18next"
import { Collection as Setting, SettingNames } from "@/core/setting/collections"
import rxDb from "@/utils/database/rxConnect"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      padding: 0
    },
    nested: {
      paddingLeft: theme.spacing(5),
      transition: "padding-left 0.5s ease"
    },
    expandIcon: {
      color: theme.bunadmin.iconColor
    }
  })
)

interface Props {
  data: Type[]
}

export default function NestedList({ data }: Props): any {
  const { t } = useTranslation("plugins")
  const router = useRouter()
  let { group: qGroup = "", name: qName } = router.query
  const classes = useStyles()
  const [open, setOpen] = useState({} as { [key: string]: boolean })
  const [currentRole, setCurrentRole] = useState("")

  if (router.route === DynamicDocRoute) {
    qGroup = "docs/" + router.query.category
    qName = router.query.slug
  }

  useEffect(() => {
    // set default opened parent
    if (typeof qGroup === "object") return
    const parent = qGroup.replace("docs/", "")
    handleOpen({ name: parent })
    ;(async () => {
      // query role from bunadmin_setting
      const setting = Setting.name
      const db = await rxDb()
      const settingRes = await db[setting]
        .findOne()
        .where("name")
        .eq(SettingNames.role)
        .exec()
      const role = (settingRes && settingRes.value) || ""
      setCurrentRole(role)
    })()
  }, [])

  const handleOpen = ({ name }: { name: string }) => {
    setOpen({
      ...open,
      [name]: !open[name]
    })
  }

  const handleClick = ({ name, slug }: { name: string; slug?: string }) => {
    if (slug !== undefined && slug !== "") {
      const isUrl = new RegExp("^http.*").test(slug)

      if (!isUrl) {
        if (router.route === DynamicDocRoute) {
          return router.push(DynamicDocRoute, slug).then(_r => {})
        }

        router.push(DynamicRoute, slug).then(_r => {})
      } else {
        router.push(slug).then(_r => {})
      }
    } else {
      handleOpen({ name })
    }
  }

  if (data.length === 0) return null

  // sorting
  data = [...data]
  data = data.sort(function(a, b) {
    return Number(b.rank) - Number(a.rank)
  })

  // handing role
  function isAllowedRole(currentRole: string, allowedRole: string): boolean {
    const currentRoles: string[] = currentRole.split(",")
    const allowedRoles: string[] = allowedRole.split(",")

    for (let i = 0; i < currentRoles.length; i++) {
      // both are Array
      if (allowedRoles.includes(currentRoles[i])) return true
      // currentRole is Array, allowedRole is String
      if (allowedRole === currentRoles[i]) return true
    }

    // currentRole is String, allowedRole is Array
    if (allowedRoles.includes(currentRole)) return true

    // both are String
    if (allowedRole && allowedRole !== currentRole) return false

    return false
  }

  // handling slug (upload-*, auth-*)
  function handleSlug(slug: string) {
    // /auth-buncms/users -> /auth/users
    if (slug.indexOf("/auth-") > -1) {
      slug = slug.replace(/auth-.*\/.*?/, "auth/")
    }

    // /upload-buncms/files -> /upload/files
    if (slug.indexOf("/upload-") > -1) {
      slug = slug.replace(/upload-.*\/.*?/, "upload/")
    }

    return slug
  }

  return (
    <>
      {data
        .filter(item => item.parent === "")
        .map(item => {
          const { name, label, icon, icon_type, role } = item

          // Check the role
          if (role && !isAllowedRole(currentRole, role)) return null

          let { slug } = item
          if (slug) slug = handleSlug(slug)

          return (
            <List key={name} component="nav" className={classes.root}>
              <ListItem
                button
                selected={slug === `/${qGroup}/${qName}`}
                onClick={() => handleClick({ name, slug })}
              >
                <ListItemIcon>
                  <MenuIcon name={name} icon={icon} icon_type={icon_type} />
                </ListItemIcon>
                <ListItemText primary={t(label || name)} />
                {/* Expand Icon */}
                {data.filter(item => item.parent === name).length > 0 &&
                  (open[name] ? (
                    <ExpandLess
                      fontSize="small"
                      className={classes.expandIcon}
                    />
                  ) : (
                    <ExpandMore
                      fontSize="small"
                      className={classes.expandIcon}
                    />
                  ))}
              </ListItem>
              {/* Collapse */}
              <Collapse in={open[name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/* Submenus */}
                  {data
                    .filter(item => item.parent === name)
                    .map(item => {
                      const { name, label } = item
                      let { slug } = item
                      if (slug) slug = handleSlug(slug)

                      return (
                        <ListItem
                          key={name}
                          button
                          className={classes.nested}
                          selected={slug === `/${qGroup}/${qName}`}
                          onClick={() => handleClick({ name, slug })}
                        >
                          <ListItemText primary={t(label || name)} />
                        </ListItem>
                      )
                    })}
                </List>
              </Collapse>
            </List>
          )
        })}
    </>
  )
}
