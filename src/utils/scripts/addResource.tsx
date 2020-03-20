import languages from "@/utils/config/languages"
import requirePlugins from "@/utils/scripts/requirePlugins"

export default function addResource({
  i18n,
  team,
  group
}: {
  i18n: any
  team: string
  group: string
}) {
  Object.keys(languages).map(lan => {
    let pluginI18n: any = requirePlugins(`${team}-${group}/utils/i18n/${lan}`)
    pluginI18n = pluginI18n && pluginI18n.plugins
    pluginI18n && i18n.addResourceBundle(lan, "plugins", pluginI18n, true, true)
  })
}
