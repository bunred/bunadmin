const path = require("path")
const FileHound = require("filehound")
const fs = require("fs")
const Log = require("next/dist/build/output/log")

/**
 * Prepare bunadmin plugins, generate the file `plugins/pluginsData.json`
 * @return {boolean}
 */
module.exports = () => {
  // find all plugin initData files
  const asPackage = __dirname.indexOf("/node_modules/") > -1
  const pluginsPath = asPackage
    ? path.resolve(__dirname, "plugins") // PROD using as package
    : path.resolve(__dirname, "../../plugins") // DEV

  // Prepare plugins START
  Log.info("prepare bunadmin plugins")

  // Generate pluginsData.json START
  Log.wait("preparing...")

  const pluginsInitFiles = FileHound.create()
    .paths(pluginsPath)
    .match(["initData.js", "initData.ts"])
    .findSync()
  let jsonStr = JSON.stringify(pluginsInitFiles)

  // replace to {team}-{group} path
  jsonStr = jsonStr.replace(/\\\\/g, "/")
  jsonStr = jsonStr.replace(/".*?\/plugins\/(.*?)"/gm, `"$1"`)

  // handle NEXT_PUBLIC_AUTH_PLUGIN
  if (process.env.NEXT_PUBLIC_AUTH_PLUGIN) {
    let specifiedAuthPluginExists
    try {
      specifiedAuthPluginExists = require(process.env.NEXT_PUBLIC_AUTH_PLUGIN +
        "/package.json").version
    } catch (e) {
      Log.error(
        "AUTH_PLUGIN specified but not exists: " +
          process.env.NEXT_PUBLIC_AUTH_PLUGIN
      )
    }
    if (!specifiedAuthPluginExists) return
  }

  // handle duplicate auth plugins (keep one)
  const countAuth = (jsonStr.match(/bunadmin-auth-/g) || []).length
  if (countAuth > 1) {
    const newArr = []
    JSON.parse(jsonStr).map(item => {
      if (
        item.indexOf(process.env.NEXT_PUBLIC_AUTH_PLUGIN) > -1 ||
        item.indexOf("bunadmin-auth-") < 0
      ) {
        newArr.push(item)
      }
    })
    jsonStr = JSON.stringify(newArr)
  }

  // handle ignored plugins
  const ignoredArr = process.env.NEXT_PUBLIC_IGNORED_PLUGINS
    ? process.env.NEXT_PUBLIC_IGNORED_PLUGINS.split(/[ ,]+/)
    : []
  ignoredArr.map(item => {
    const ignoredRegx = new RegExp(`"${item}.*?",?`, "g")
    jsonStr = jsonStr.replace(ignoredRegx, "")
  })
  jsonStr = jsonStr.replace(",]", "]")

  const name = "pluginsData.json"
  const savePath = path.resolve(pluginsPath, name)
  fs.writeFile(savePath, jsonStr, "utf8", () => {
    // Prepare plugins END
    Log.info("bunadmin plugins data generated successfully")
  })
  // Generate pluginsData.json END

  return true
}
