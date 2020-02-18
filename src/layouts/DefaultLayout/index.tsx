import React from "react"
import clsx from "clsx"
import CssBaseline from "@material-ui/core/CssBaseline"
import Drawer from "@material-ui/core/Drawer"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { useTheme } from "@material-ui/core/styles"
import { defaultLayoutStyles } from "./styles"
import DefaultHead from "../../utils/components/DefaultHead"
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
          <div className={classes.toolbar} />
          {container}
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </Box>
      </main>
    </div>
  )
}
