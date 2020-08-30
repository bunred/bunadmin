import React, { useState } from "react"
import { TFunction } from "i18next"
import { ENV, BunadminFileType, Uploader, OnDropProps } from "@bunred/bunadmin"
import { EditComponentProps } from "material-table"
import { DropResult } from "react-beautiful-dnd"
import { IFile } from "../../utils/types/file"
import uploadMediaCtrl from "../controllers/uploadMediaCtrl"

export default function FileUploader({
  t,
  viewMode = true,
  prefix,
  data = [],
  buttonTitlePreview,
  buttonTitleUpdate,
  editProps
}: {
  t: TFunction
  viewMode?: boolean
  prefix?: string
  data?: IFile[]
  buttonTitlePreview?: string
  buttonTitleUpdate?: string
  editProps?: EditComponentProps<any>
}) {
  const [files, setFiles] = useState<BunadminFileType[]>([])
  const [ready, setReady] = useState(false)

  if (!prefix && !ENV.ON_MOCK) prefix = ENV.UPLOAD_URL

  if (!ready) {
    const tmp: BunadminFileType[] = []
    data?.map(item => {
      tmp.push({
        id: item.id,
        file_name: item.name,
        url: item.url,
        display_name: item.name
      })
    })

    setFiles(tmp)
    setReady(true)
  }

  async function onDrop({ droppedFiles, prefix, setImageUrl }: OnDropProps) {
    await uploadMediaCtrl({
      editProps: editProps,
      droppedFiles,
      prefix,
      setImageUrl,
      files,
      setFiles
    })
  }

  function onDragSort(result: DropResult) {
    // TODO add position for Strapi Media or use alternativeText: replace 'bunadmin_65536' N soring
    console.log(result)
  }

  return (
    <Uploader
      t={t}
      viewMode={viewMode}
      files={files}
      prefix={prefix}
      buttonTitlePreview={buttonTitlePreview}
      buttonTitleUpdate={buttonTitleUpdate || "Upload Files"}
      onDrop={onDrop}
      onDragSort={onDragSort}
    />
  )
}
