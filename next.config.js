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
  const pluginsPath = path.resolve("plugins")
  const pluginsInitFiles = FileHound.create()
    .paths(pluginsPath)
    .match("initData.tsx")
    .findSync()
  let jsonStr = JSON.stringify(pluginsInitFiles)

  // replace to {team}-{group} path
  jsonStr = jsonStr.replace(/\\\\/g, "/")
  jsonStr = jsonStr.replace(/".*?\/plugins\/(.*?)"/gm, `"$1"`)

  const name = "pluginsData.json"
  const savePath = path.resolve(__dirname, "plugins", name)
  fs.writeFile(savePath, jsonStr, "utf8", () => {
    console.log(chalk.white("  · generation complete!"))

    // Enable plugins END
    console.log(chalk.blue("- Bunadmin plugins are enabled."))
  })
  // Generate pluginsData.json END

  return withMDX({
    poweredByHeader: false,
    generateBuildId: async () => {
      return "bunadmin-1.0.0-alpha.5"
    },
    // webpack
    webpack: config => {
      // alias
      config.resolve.alias["@"] = path.resolve(__dirname, "dist/src")
      config.resolve.alias["@plugins"] = path.resolve(__dirname, "plugins")
      // rules
      config.module.rules.push({
        // ignore file or file types
        test: /\.md$|LICENSE$|\.yml$/,
        use: [{ loader: "ignore-loader" }]
      })
      config.module.rules.push({
        // loader jsx, tsx with next/babel
        test: /\.jsx$|\.tsx$/,
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
