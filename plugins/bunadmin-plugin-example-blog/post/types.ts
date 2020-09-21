import { IFile } from "bunadmin-upload-strapi"

export default interface Type {
  id: string
  created_at: number
  updated_at: number
  status: string
  user_id: boolean
  name: string
  content: string
  cover: IFile
  albums: IFile[]
}
