import { Collection as left_menu } from "../left_menu/collections"
import { Collection as notice } from "../notice/collections"
import { Collection as schema } from "../schema/collections"

import { Columns as left_menu_columns } from "../left_menu/columns"
import { Columns as notice_columns } from "../notice/columns"
import { Columns as schema_columns } from "../schema/columns"

export const Data = [
  { name: left_menu.name, columns: left_menu_columns },
  { name: notice.name, columns: notice_columns },
  { name: schema.name, columns: schema_columns }
]
