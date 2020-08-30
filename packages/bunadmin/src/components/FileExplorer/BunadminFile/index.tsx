import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress
} from "@material-ui/core"
import DropZone from "react-dropzone"
import FilePreview from "../FilePreview"
import styles from "./styles"
import BunadminFileProps from "../"
import CardBottomArea from "./CardBottomArea"
import { Translation } from "react-i18next"

export interface OnDropProps {
  droppedFiles: any[]
  prefix?: string
  setImageUrl?: Dispatch<SetStateAction<string>>
}

export default function BunadminFile(props: BunadminFileProps) {
  const {
      fileKey,
      className,
      ariaAttributes,
      htmlAttributes,

      uploadText,
      replaceText,

      file,
      width,
      prefix,
      onDrop,
      onDel,
      cardStyle,
      mediaStyle = {},
      viewMode,
      multipleUpload,
      hideUploadTip
    } = props,
    default_image = "/p/default.jpg"

  let id: string | undefined,
    display_name: string | undefined,
    url: string | undefined
  if (file) {
    id = file.id
    display_name = file.display_name
    url = file.url
  }

  const classes = styles({ id, width })
  const [uploading, setUploading] = React.useState(false),
    [imageUrl, setImageUrl] = React.useState(
      url ? (prefix ? prefix + url : url) : default_image
    ),
    [preview, setPreview] = useState(false)

  const handleOnDrop = async (droppedFiles: any[]) => {
    setUploading(true)
    if (onDrop) {
      await onDrop({ droppedFiles, prefix, setImageUrl })
    }
    setUploading(false)
  }

  const handleDelMedia = async () => {
    setUploading(true)
    if (onDel) {
      await onDel({ file })
      setImageUrl(default_image)
    }
    setUploading(false)
  }

  const BottomComp = () => (
    <CardBottomArea
      id={id}
      uploading={uploading}
      setPreview={setPreview}
      classes={classes}
      handleDelMedia={handleDelMedia}
    />
  )

  useEffect(() => {
    multipleUpload &&
      console.log(multipleUpload, "Multiple Upload not supported yet")
  }, [display_name])

  const UploadText = () => (
    <Translation ns="table">{t => t("Choose or drag")}</Translation>
  )

  const ReplaceText = () => (
    <Translation ns="table">{t => t("Choose or drag to replace")}</Translation>
  )

  return (
    <div
      {...ariaAttributes}
      {...htmlAttributes}
      key={fileKey}
      className={`${className} ${classes.root}`}
    >
      <FilePreview
        preview={preview}
        setPreview={setPreview}
        file={file}
        prefix={prefix}
      />

      <Card
        className={classes.Card}
        style={{
          ...(viewMode && mediaStyle),
          ...cardStyle
        }}
        onClick={() => id && viewMode && setPreview(true)}
      >
        <DropZone onDrop={acceptedFiles => handleOnDrop(acceptedFiles)}>
          {({
            getRootProps,
            getInputProps
          }: {
            getRootProps: any
            getInputProps: any
          }) => {
            if (!uploading) {
              return (
                <CardActionArea disabled={viewMode && !id}>
                  {!viewMode && (
                    <div {...getRootProps()} className={classes.DropZone}>
                      <div className={classes.UploadText}>
                        {!hideUploadTip &&
                          (!id
                            ? uploadText || <UploadText />
                            : replaceText || <ReplaceText />)}
                      </div>
                      <input {...getInputProps()} />
                    </div>
                  )}
                  <CardMedia
                    style={{ ...mediaStyle, width, height: width || undefined }}
                    component="img"
                    image={imageUrl}
                  />
                  {!id && viewMode && <BottomComp />}
                </CardActionArea>
              )
            } else {
              return (
                <div
                  className={classes.DropZone}
                  style={{
                    ...mediaStyle,
                    width,
                    height: width || undefined,
                    position: "relative"
                  }}
                >
                  <CircularProgress />
                </div>
              )
            }
          }}
        </DropZone>

        {!viewMode && (id || uploading) && <BottomComp />}
      </Card>
    </div>
  )
}
