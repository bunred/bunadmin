import rxInitData from "@/utils/database/rxInitData"
import { Collection as Setting, SettingNames } from "@/core/setting/collections"
import requirePlugins from "@/utils/scripts/requirePlugins"
import rxDb from "@/utils/database/rxConnect"
import { Primary as AuthPrimary } from "@/core/auth/schema"
import { DEFAULT_AUTH_PLUGIN, ENV } from "@/utils/config"
import { MenuType, SchemaType } from "@/core"
import { IAuthPlugin, InitData, store } from "@/utils"
import { setNestedMenu } from "@/slices/nestedMenuSlice"
import { setSchema } from "@/slices/schemaSlice"
import { Dispatch, SetStateAction } from "react"
import { NextRouter } from "next/dist/next-server/lib/router/router"
import authorization from "@/utils/scripts/authorization"
import initDocsData from "@/utils/database/rxInitData/initDocsData"
import { Type } from "@/core/schema/types"
import addResource from "@/utils/scripts/addResource"
import { i18n } from "i18next"

type Props = {
  i18n: i18n
  router: NextRouter
  setReady: Dispatch<SetStateAction<boolean>>
  initialized: boolean
  setInitialized: Dispatch<SetStateAction<boolean>>
}

export default async function initData({
  i18n,
  router,
  setReady,
  initialized,
  setInitialized
}: Props) {
  const authPluginName =
    process.env.NEXT_PUBLIC_AUTH_PLUGIN || DEFAULT_AUTH_PLUGIN

  const {
    initData,
    authResponseKey,
    authRequestUrl,
    authRequestMethod
  } = (await import(`@plugins/${authPluginName}`)) as IAuthPlugin

  // Avoid repeated initialization
  if (!initialized) {
    // Init Auth Plugin Data
    initData && (await initPluginData(initData))
  }

  // Authenticate the current user, fail to execute redirect
  await authorization({
    router,
    authResponseKey, // Successful when the response data[key] is not null
    authRequestUrl,
    authRequestMethod
  })

  // Avoid repeated initialization
  if (initialized) return

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

  // Init Plugins Data
  const data = []
  const pluginsData = require("@plugins/pluginsData")
  for (let i = 0; i < pluginsData.length; i++) {
    const path: string = pluginsData[i]
    const fileContent: any = requirePlugins(path)

    if (!fileContent) continue

    const initData: InitData = fileContent.default

    await initPluginData(initData)
    data.push(initData)
  }

  // Init Plugins I18n
  const setting = db[Setting.name]
  const resI18nCode = await setting
    .findOne({ name: { $eq: SettingNames.i18n_code } })
    .exec()
  if (resI18nCode) i18n.changeLanguage(resI18nCode.value).then()

  data.map(({ data }) => {
    addSources(i18n, data)
  })

  setInitialized(true)
  // Main page ready
  setReady(true)
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
            created_at: Date.now(),
            role: item.role
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
            icon: menuItem.icon,
            role: menuItem.role
          })
      }
    })
    // redux setSchema
    store.dispatch(setSchema(schemaData))
    // redux setNestedMenu
    store.dispatch(setNestedMenu(menuData))
  }
}

function addSources(i18n: i18n, schemas: any) {
  schemas = schemas.map((item: Type) => ({ ...item }))

  // Add i18n resource
  let pathObj: any
  schemas.map(({ team, group }: SchemaType) => {
    if (!pathObj) pathObj = {}
    // continue when plugin path added
    if (!pathObj[team + group]) {
      pathObj[team + group] = true
      addResource({ i18n, team, group })
    }
  })
}
