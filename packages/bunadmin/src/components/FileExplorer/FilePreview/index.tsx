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
import DownloadIcon from "@material-ui/icons/GetApp"
import { useStyles } from "./styles"
import { BunadminFileType } from "@/components"
import {
  default_file,
  handleImage,
  isImage
} from "@/components/FileExplorer/BunadminFile"
import { ENV } from "@/utils"

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
  const { created_at, display_name, file_name } = file
  const [state, setState] = useState({ fullScreen: fullScreen })

  let { url = default_file } = file
  const previewUrl = ENV.FILE_PREVIEW_URL
  url =
    typeof previewUrl === "string"
      ? previewUrl + url
      : prefix
      ? prefix + url
      : url

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
                image={handleImage(url)}
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

          {isImage(url) && (
            <IconButton aria-label="Preview" onClick={handleFullWidthChange}>
              {!state.fullScreen ? <ZoomInIcon /> : <ZoomOutIcon />}
            </IconButton>
          )}

          <a href={url} target="_blank">
            <IconButton aria-label="Download">
              <DownloadIcon />
            </IconButton>
          </a>

          <IconButton aria-label="Close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
