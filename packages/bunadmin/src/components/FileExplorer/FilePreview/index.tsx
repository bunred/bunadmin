import React, { Dispatch, SetStateAction, useState } from "react"
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Dialog,
  DialogActions,
  IconButton
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import ZoomInIcon from "@material-ui/icons/ZoomIn"
import ZoomOutIcon from "@material-ui/icons/ZoomOut"
import { useStyles } from "./styles"
import { BunadminFileType } from "@/components"

interface Props {
  preview: boolean
  setPreview: Dispatch<SetStateAction<boolean>>
  fullScreen?: boolean
  file?: BunadminFileType
  prefix?: string
}

export default function FilePreview({
  preview,
  setPreview,
  fullScreen,
  file,
  prefix
}: Props) {
  if (!file) return null

  const classes = useStyles()
  const { created_at, display_name, file_name, url } = file
  const [state, setState] = useState({ fullScreen: fullScreen })

  function handleFullWidthChange() {
    setState({ ...state, fullScreen: !state.fullScreen })
  }
  const handleClose = () => {
    setPreview(false)
  }

  return (
    <div>
      <Dialog
        fullScreen={state.fullScreen}
        maxWidth="md"
        open={preview}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Card className={classes.cardRoot} onClick={handleClose}>
          <CardActionArea className={classes.cardActionArea}>
            <CardActions className={classes.cardActions}>
              <CardMedia
                style={{ width: "max-content" }}
                component="img"
                image={prefix ? prefix + url : url}
                alt={display_name || file_name}
                title={display_name || file_name}
                onClick={handleClose}
              />
            </CardActions>
          </CardActionArea>
        </Card>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleClose} color="primary">
            {display_name || created_at}
          </Button>

          <IconButton aria-label="Preview" onClick={handleFullWidthChange}>
            {!state.fullScreen ? <ZoomInIcon /> : <ZoomOutIcon />}
          </IconButton>

          <IconButton aria-label="Close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
