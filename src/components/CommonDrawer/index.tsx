import React, { useState } from "react"
import { Button, Drawer } from "@material-ui/core"
import styles from "./styles"

interface Props {
  width?: number | string
  height?: number | string
  direction?: "left" | "top" | "right" | "bottom"
  buttonTitle: string
  children: React.ReactNode
}

export default function CommonDrawer({
  width,
  height,
  direction,
  buttonTitle,
  children
}: Props) {
  const classes = styles({ width, height })
  const [state, setState] = useState({ open: false })

  function toggleDrawer() {
    setState({ ...state, open: !state.open })
  }

  return (
    <>
      <Button onClick={() => toggleDrawer()}>{buttonTitle}</Button>
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor={direction || "right"}
        open={state.open}
        onClose={toggleDrawer}
      >
        {children}
      </Drawer>
    </>
  )
}
