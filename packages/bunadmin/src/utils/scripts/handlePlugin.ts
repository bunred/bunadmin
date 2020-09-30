/**
 * bunadmin-[team]-[group]/[name] -> bunadmin-[plugin or special]-[group]/[name]
 * return dynamic import path: bunadmin-[plugin]-[group]/[name]
 * example:
 * bunadmin-plugin-blog/category
 * bunadmin-auth-buncms/users
 * bunadmin-upload-buncms/files
 */
export function handlePluginPath({
  team,
  group,
  name
}: {
  team: string
  group: string
  name: string
}): string {
  let pluginPath = `${team}-${group}/${name}`
  const isSpecialPlugin = RegExp(".*-auth|.*-upload").test(pluginPath)

  if (!isSpecialPlugin) {
    /**
     * bunadmin-blog/category -> bunadmin-plugin-blog/category
     */
    pluginPath = pluginPath.replace("bunadmin-", "")
    pluginPath = `bunadmin-plugin-${pluginPath}`
  } else {
    /**
     * buncms-auth-buncms/users -> bunadmin-auth-buncms/users
     * buncms-upload-buncms/files -> bunadmin-upload-buncms/files
     */
    pluginPath = `bunadmin-${group}/${name}`
  }

  return pluginPath
}

/**
 * Handling special group, remove [team]
 * [slug plugin]-[team] -> [slug plugin]
 * @param group
 */
export function specialPluginGroup(group: string): string {
  group = group.replace(/^auth-.*/g, "auth")
  group = group.replace(/^upload-.*/g, "upload")

  return group
}

/**
 * Handling special slug, remove [team]
 * /[slug plugin]-[team]/[name] -> /[slug plugin]/[name]
 * @param slug
 */
export function specialPluginSlug(slug: string): string {
  slug = slug.replace(/^\/auth-.*\/.*?/, "/auth/")
  slug = slug.replace(/^\/upload-.*\/.*?/, "/upload/")

  return slug
}
