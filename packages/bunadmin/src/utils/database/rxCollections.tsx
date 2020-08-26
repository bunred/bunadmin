import { Collection as LocalNoticeCollection } from "@/core/notice/collections"
import { Collection as LocalAuthCollection } from "@/core/auth/collections"
import { Collection as LocalSettingCollection } from "@/core/setting/collections"

export const rxCollections = [
  LocalNoticeCollection,
  LocalAuthCollection,
  LocalSettingCollection
]
