const chalk = require('chalk')
const path = require('path')
const AdmZip = require('adm-zip')
const request = require('request-promise-native')
const compareVersions = require('compare-versions')
const fs = require('fs')

// local plugin-info name
const pluginsInfo = "plugins-info.json"
// plugins absolute path
const plugins = "./plugins"
// down url prefix
const prefixUrl = "https://raw.githubusercontent.com/bunred/bunadmin-plugins/master/navigation"

const rmDir = function(dir) {
  let files
  dir = dir + "/"
  try {
    files = fs.readdirSync(dir)
  } catch (e) {
    return console.log("!Oops, directory not exist.")
  }

  if (files.length > 0) {
    files.forEach(function(x) {
      if (fs.statSync(dir + x).isDirectory()) {
        rmDir(dir + x)
      } else {
        fs.unlinkSync(dir + x)
      }
    }) // files foreEach end
  } // if files.length end

  fs.rmdirSync(dir)
} // rmDir() end

const downloadAndUnzip = function (url, folder) {
  const extractedFolder = url.replace(/.*?github.com\/.*?\/(.*?)\/archive\/(.*?).zip/g, '$1-$2')

  const download = async function (url) {
    try {
      return await request({
        url: url,
        method: 'GET',
        encoding: null
      })
    } catch (e) {
      return console.error(`Download Error: ${folder}, ${url}`)
    }
  }

  const unzip = function (buffer) {
    const zip = new AdmZip(buffer)

    zip.extractAllToAsync(plugins, true, function () {
      try {
        if (fs.existsSync(`${plugins}/${folder}`)) {
          rmDir(`${plugins}/${folder}`)
        }
        fs.renameSync(`${plugins}/${extractedFolder}`, `${plugins}/${folder}`)
      } catch (e) {
        console.log(e)
      }
    }) // zip.extractAllToAsync end

  } // unzip() end

  return download(url)
    .then(unzip)
} // downloadAndUnzip() END

// Checking plugins START
console.log(chalk.white('- Checking bunadmin plugins updates...'))

const newJsonInfo = []
// read and handle plugins-info.json
const pluginsInfoArr = require("./plugins-info.json") || []
pluginsInfoArr.forEach(function(p, i) {
  const isEnabled = p["enable"]
  if (!isEnabled) {
    newJsonInfo.push(p)
    return console.log(chalk.white(`  · Plugin is not enabled: ${p["plugin-id"]}`))
  }

  const currentVersion = p["plugin-version"]
  const urlOL = prefixUrl + `/${p["plugin-navigation"]}/${p["plugin-author"]}/${p["plugin-id"]}.json`

  try {
    request(urlOL).then((data) => {
      const jsonOL = JSON.parse(data)

      const newVersion = jsonOL["plugin-version"]
      // No plugin updates available
      if (compareVersions(newVersion, currentVersion) <= 0) {
        console.log(chalk.white(`  · No plugin updates available: ${p["plugin-id"]}`))
        newJsonInfo.push(p)

        // last one
        if (i + 1 === pluginsInfoArr.length) {
          console.log(chalk.blue('- Checking plugins completed.'))
        }

        return
      } // if compareVersions end

      const downloadUrl = jsonOL["plugin-download"]["url"]
      const pluginFolder = jsonOL["plugin-folder"]

      // download to update plugin
      downloadAndUnzip(downloadUrl, pluginFolder).then(function () {
        console.log(chalk.green(`  · Plugin updated to ${newVersion}: ${p["plugin-id"]}`))
        newJsonInfo.push({ enable: true, ...jsonOL })

        // last one
        if (i + 1 === pluginsInfoArr.length) {
          console.log(chalk.blue('- Checking bunadmin plugins completed.'))

          // write new plugins-info.json
          const savePath = path.resolve(__dirname, pluginsInfo)
          fs.writeFile(savePath, JSON.stringify(newJsonInfo), 'utf8', () => {

            // Checking plugins END
            console.log(chalk.blue('- Updated plugins-info.json'))
          })
        }
      }).catch(function (err) {
        console.error(err)
      }) // downloadAnUnzip end

    }) // request(urlOL) end
  } catch (e) {
    console.log(e)
  } // try catch end

}) // pluginsInfoArr forEach end
