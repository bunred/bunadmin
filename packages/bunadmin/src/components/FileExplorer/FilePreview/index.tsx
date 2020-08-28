import React, { Dispatch, SetStateAction, useState } from "react"
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import ZoomInIcon from "@material-ui/icons/ZoomIn"
import ZoomOutIcon from "@material-ui/icons/ZoomOut"
import { useStyles } from "./styles"

interface Props {
  preview: boolean
  setPreview: Dispatch<SetStateAction<boolean>>
  title?: string
  fullScreen?: boolean
  url: string
  file?: {
    created_at?: string
    media_name?: string
  }
}

export default function FilePreview({
  title,
  preview,
  setPreview,
  fullScreen,
  url,
  file
}: Props) {
  if (!file) return null

  const classes = useStyles()
  const { created_at, media_name } = file
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
        {title && (
          <DialogTitle
            style={{ textAlign: "center" }}
            id="responsive-dialog-title"
          >
            {title}
            {created_at || "File not uploaded"}
          </DialogTitle>
        )}
        <Card className={classes.cardRoot} onClick={handleClose}>
          <CardActionArea className={classes.cardActionArea}>
            <CardActions className={classes.cardActions}>
              <CardMedia
                style={{ width: "max-content" }}
                component="img"
                image={url}
                alt={title}
                title={title}
                onClick={handleClose}
              />
            </CardActions>
          </CardActionArea>
        </Card>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleClose} color="primary">
            {media_name || created_at}
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
