/**
 * return string, example:
 * bunadmin-plugin-blog/category
 * bunadmin-auth-buncms/users
 * bunadmin-upload-buncms/files
 */
export default function handleSpecialPlugin({
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
