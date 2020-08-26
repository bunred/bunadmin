const path = require("path")
const FileHound = require("filehound")
const fs = require("fs")
const chalk = require("chalk")
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
})

module.exports = () => {
  // Enable plugins START
  console.log(chalk.white("- Enabling bunadmin plugins ..."))

  // Generate pluginsData.json START
  console.log(chalk.white("  · generating pluginsData.json ..."))
  // find all plugin initData files
  const asPackage = __dirname.indexOf("/node_modules/") > -1
  const pluginsPath = asPackage
    ? path.resolve(__dirname, "plugins") // PROD using as package
    : path.resolve(__dirname, "../../plugins") // DEV

  const pluginsInitFiles = FileHound.create()
    .paths(pluginsPath)
    .match(["initData.js", "initData.ts"])
    .findSync()
  let jsonStr = JSON.stringify(pluginsInitFiles)

  // replace to {team}-{group} path
  jsonStr = jsonStr.replace(/\\\\/g, "/")
  jsonStr = jsonStr.replace(/".*?\/plugins\/(.*?)"/gm, `"$1"`)

  // handling duplicate auth plugins (keep one)
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

  const name = "pluginsData.json"
  const savePath = path.resolve(pluginsPath, name)
  fs.writeFile(savePath, jsonStr, "utf8", () => {
    console.log(chalk.white("  · generation complete!"))

    // Enable plugins END
    console.log(chalk.blue("- Bunadmin plugins are enabled."))
  })
  // Generate pluginsData.json END

  return withMDX({
    poweredByHeader: false,
    generateBuildId: async () => {
      return "bunadmin-" + require("./package.json").version
    },
    // webpack
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: "empty"
        }
      }
      // alias
      config.resolve.alias["@"] = path.resolve(__dirname, "src")
      config.resolve.alias["@plugins"] = pluginsPath
      config.resolve.alias["@bunred/bunadmin"] = path.resolve(__dirname)
      // rules
      config.module.rules.push({
        // ignore file or file types
        test: /\.md$|LICENSE$|\.yml$|\.lock$|\.css$|\.jpg$/,
        use: [{ loader: "ignore-loader" }]
      })
      config.module.rules.push({
        // loader jsx, tsx with next/babel
        test: /\.jsx$|\.tsx$|\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["next/babel"]
          }
        }
      })
      return config
    }
  })
}
