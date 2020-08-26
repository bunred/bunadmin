import rxInitData from "@/utils/database/rxInitData"
import { Collection as Setting, SettingNames } from "@/core/setting/collections"
import initDocsData, {
  DocsData
} from "@/utils/database/rxInitData/initDocsData"
import requirePlugins from "@/utils/scripts/requirePlugins"
import rxDb from "@/utils/database/rxConnect"
import { Primary as AuthPrimary } from "@/core/auth/schema"
import { ENV } from "@/utils/config"
import { MenuType, SchemaType } from "@/core"
import { store } from "@/utils"
import { setNestedMenu } from "@/slices/nestedMenuSlice"
import { setSchema } from "@/slices/schemaSlice"

interface InitData {
  plugin: string
  list?: {
    name: string
    data: any
  }[]
  data?: DocsData[]
}

export default async function initData() {
  const db = await rxDb()

  // Init Core Setting Data
  await rxInitData({
    db,
    collection: Setting.name,
    name: SettingNames.init_status,
    initFunc: () =>
      initDocsData({
        db,
        collection: Setting.name,
        docsData: [
          {
            name: SettingNames.i18n_code,
            value: ENV.I18N_CODE
          },
          {
            name: AuthPrimary, // username
            value: undefined
          },
          {
            name: SettingNames.role,
            value: undefined
          },
          {
            name: SettingNames.site_name,
            value: undefined
          },
          {
            name: SettingNames.theme,
            value: undefined
          }
        ]
      })
  })

  // Init Auth Plugin Data
  try {
    // @ts-ignore
    let { initData: authInitData } = await import(`@plugins/${ENV.AUTH_PLUGIN}`)
    initData && (await initPluginData(authInitData))
  } catch (e) {
    console.warn(`initData required '@plugins/${ENV.AUTH_PLUGIN}'`)
  }

  // Init Plugins Data
  const pluginsData = require("@plugins/pluginsData")
  pluginsData.map(async (path: string) => {
    const fileContent: any = requirePlugins(path)

    if (!fileContent) return

    const initData: InitData = fileContent.default

    await initPluginData(initData)
  })
}

async function initPluginData(initData: InitData) {
  // Loop init DocsData
  if (initData.data) {
    // handle Data
    const schemaData = ([] as unknown) as SchemaType[]
    const menuData = ([] as unknown) as MenuType[]
    initData.data.map(item => {
      if ("group" in item) {
        !item.ignore_schema &&
          schemaData.push({
            id: item.id,
            name: item.name,
            label: item.label,
            group: item.group,
            team: item.team,
            customized: item.customized,
            columns: item.columns,
            created_at: Date.now()
          })
        // @ts-ignore
        const menuItem: MenuType = item
        !menuItem.ignore_menu &&
          menuData.push({
            id: item.id,
            name: item.name,
            label: item.label,
            slug:
              // disable onClick route when group is same as name
              item.group === item.name ? "" : `/${item.group}/${item.name}`,
            parent: menuItem.parent || "",
            rank: menuItem.rank || "0",
            icon_type: menuItem.icon_type,
            icon: menuItem.icon
          })
      }
    })
    // redux setSchema
    store.dispatch(setSchema(schemaData))
    // redux setNestedMenu
    store.dispatch(setNestedMenu(menuData))
  }
}
