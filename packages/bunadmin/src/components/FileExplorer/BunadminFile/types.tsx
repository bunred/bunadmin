import { AriaAttributes, HTMLAttributes } from "react"
import { OnDropProps } from "./index"

export default interface Props {
  fileKey?: string | number
  className?: string
  ariaAttributes?: AriaAttributes
  htmlAttributes?: HTMLAttributes<any>

  t?: any
  uploadText?: string
  replaceText?: string

  file?: {
    id?: string
    file_name?: string
    media_name?: string
  }
  title?: string
  width?: number
  prefix?: string

  onDrop?: ({ files, prefix, setImageUrl }: OnDropProps) => Promise<void | null>
  onDel?: ({ file }: { file: any }) => Promise<void>

  cardStyle?: object
  mediaStyle?: object

  viewMode?: boolean
  multipleUpload?: boolean
  hideUploadTip?: boolean
}
