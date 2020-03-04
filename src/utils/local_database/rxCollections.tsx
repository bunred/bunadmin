import { Collection as LeftMenCollection } from "../../modules/local_data/left_menu/collections"
import { Collection as LocalNoticeCollection } from "../../modules/local_data/notice/collections"
import { Collection as LocalSchemaCollection } from "../../modules/local_data/schema/collections"
import { Collection as LocalAuthCollection } from "../../modules/local_data/auth/collections"
import { Collection as LocalSettingCollection } from "../../modules/local_data/setting/collections"

export const rxCollections = [
  LeftMenCollection,
  LocalNoticeCollection,
  LocalSchemaCollection,
  LocalAuthCollection,
  LocalSettingCollection
]
