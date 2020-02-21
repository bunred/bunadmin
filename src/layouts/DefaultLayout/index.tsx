import React from "react"
import clsx from "clsx"
import CssBaseline from "@material-ui/core/CssBaseline"
import Drawer from "@material-ui/core/Drawer"
import Box from "@material-ui/core/Box"
import { useTheme } from "@material-ui/core/styles"
import { defaultLayoutStyles } from "./styles"
import DefaultHead from "../../components/DefaultHead"
import LeftMenu from "./LeftMenu"
import TopBar from "./TopBar"

const useStyles = defaultLayoutStyles

interface ResponsiveDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container?: any
}

// ResponsiveDrawer
export default function DefaultLayout(props: ResponsiveDrawerProps) {
  const { container } = props
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <div className={classes.root}>
      <DefaultHead />
      <CssBaseline />
      <TopBar menuClick={handleDrawerToggle} />
      <nav aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          PaperProps={{
            elevation: 1
          }}
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          anchor={theme.direction === "rtl" ? "right" : "left"}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <LeftMenu />
        </Drawer>
      </nav>
      <main className={classes.content}>
        <Box boxShadow={1} className={classes.contentBox}>
          {container}
        </Box>
      </main>
    </div>
  )
}
