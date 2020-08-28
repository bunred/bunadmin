import React, { Dispatch, SetStateAction, useMemo } from "react"
import { EditComponentProps } from "material-table"
import BunadminFile, { OnDropProps } from "./BunadminFile"
import { ENV } from "@/utils"

interface IUploadMediaProps extends OnDropProps {
  editProps?: EditComponentProps<any>
  setImageUrl?: Dispatch<SetStateAction<string>>
  uploadPrefix?: string
}

interface Props {
  width?: number
  uploadPrefix?: string
  rowData?: any
  viewMode?: boolean
  editProps?: EditComponentProps<any>
  onDrop?: (uploadProps: IUploadMediaProps) => Promise<void | null>
  deleteSer?: any
}

export default function Cover({
  width,
  uploadPrefix,
  viewMode,
  editProps,
  rowData,
  onDrop,
  deleteSer
}: Props) {
  const item = viewMode ? rowData : editProps?.rowData

  return useMemo(
    () => (
      <BunadminFile
        width={width}
        viewMode={viewMode}
        prefix={ENV.SITE_URLS[2]}
        onDrop={async ({ files, prefix, setImageUrl }) =>
          onDrop
            ? await onDrop({
                files,
                prefix,
                setImageUrl,
                editProps,
                uploadPrefix
              })
            : null
        }
        onDel={({ file }) => deleteSer(file)}
        file={item.cover || {}}
      />
    ),
    [item.cover]
  )
}
