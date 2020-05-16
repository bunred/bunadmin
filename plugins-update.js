const chalk = require("chalk");
const path = require("path");
const AdmZip = require("adm-zip");
const request = require("request-promise-native");
const compareVersions = require("compare-versions");
const fs = require("fs");

// local plugin-info name
const pluginsInfo = "plugins-info.json";
// plugins absolute path
const plugins = "./plugins";
// down url prefix
const prefixUrl =
  "https://raw.githubusercontent.com/bunred/bunadmin-plugins/master/navigation";

const rmDir = function(dir) {
  let files;
  dir = dir + "/";
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    return console.log("  · !Oops, directory not exist.");
  }

  if (files.length > 0) {
    files.forEach(function(x) {
      if (fs.statSync(dir + x).isDirectory()) {
        rmDir(dir + x);
      } else {
        fs.unlinkSync(dir + x);
      }
    }); // files foreEach end
  } // if files.length end

  fs.rmdirSync(dir);
}; // rmDir() end

const downloadAndUnzip = async function(reqOptions, folder) {
  const url = reqOptions.url;
  const extractedFolder = url.replace(
    /.*?github.com\/.*?\/(.*?)\/archive\/(.*?).zip/g,
    "$1-$2"
  );

  const download = async function(url) {
    try {
      return await request({
        ...reqOptions,
        encoding: null
      });
    } catch (e) {
      console.error(`  · Download plugin failed: '${folder}', ${url}`);
      return "download_error";
    }
  };

  const unzip = function(buffer) {
    if (buffer === "download_error") {
      return buffer;
    }

    const zip = new AdmZip(buffer);

    zip.extractAllToAsync(plugins, true, function() {
      try {
        if (fs.existsSync(`${plugins}/${folder}`)) {
          rmDir(`${plugins}/${folder}`);
        }
        fs.renameSync(`${plugins}/${extractedFolder}`, `${plugins}/${folder}`);
      } catch (e) {
        console.log(`  · Unzip error: directory ${folder}`);
        return "unzip_error";
      }
    }); // zip.extractAllToAsync end

    return "unzip done";
  }; // unzip() end

  const downRes = await download(url);
  return unzip(downRes);
}; // downloadAndUnzip() END

// Checking plugins START
console.log(chalk.white("- Checking bunadmin plugins updates..."));

const newJsonInfo = [];
// read and handle plugins-info.json
const pluginsInfoArr = require("./plugins-info.json") || [];
let keepOldNum = 0;

async function updatePlugins() {
  for (let i = 0; i < pluginsInfoArr.length; i++) {
    const p = pluginsInfoArr[i];

    const isEnabled = p["enable"];
    if (!isEnabled) {
      newJsonInfo[i] = p; // keep original plugin data
      keepOldNum++;
      console.log(chalk.white(`  · Plugin is not enabled: ${p["plugin-id"]}`));
      continue;
    }

    const currentVersion = p["plugin-version"];
    const urlOL =
      prefixUrl +
      `/${p["plugin-navigation"]}/${p["plugin-author"]}/${p["plugin-id"]}.json`;
    let reqOptions = {
      url: urlOL
    };

    const isCustomRequest =
      p["custom-request-options"] && p["custom-request-options"]["url"];
    if (isCustomRequest) {
      reqOptions = p["custom-request-options"];
    }

    let data;
    try {
      data = await request(reqOptions);
    } catch (e) {
      console.error(`  · Remote plugin does not exist: ${p["plugin-id"]}`);
      newJsonInfo[i] = p; // keep original plugin data
      continue;
    }

    const jsonOL = JSON.parse(data);

    const localFolder = p["plugin-folder"];
    const existedFolder = fs.existsSync(`${plugins}/${localFolder}`);

    const newVersion = jsonOL["plugin-version"];
    // No plugin updates available
    if (existedFolder && compareVersions(newVersion, currentVersion) <= 0) {
      console.log(
        chalk.white(`  · No plugin updates available: ${p["plugin-id"]}`)
      );
      newJsonInfo[i] = p; // keep original plugin data
      keepOldNum++;

      continue;
    } // if compareVersions end

    const downloadUrl =
      jsonOL["plugin-download"] && jsonOL["plugin-download"]["url"];
    const pluginFolder = jsonOL["plugin-folder"];

    if (!downloadUrl || !pluginFolder) {
      console.error(
        `  · Params Error: please check the plugin '${p["plugin-id"]}'`
      );
      continue;
    }

    const downloadOpts = {
      ...reqOptions,
      url: downloadUrl,
      encoding: null
    };

    // download to update plugin
    const duRes = await downloadAndUnzip(downloadOpts, pluginFolder); // downloadAnUnzip end

    if (duRes === "download_error") {
      newJsonInfo[i] = p; // keep original plugin data
      keepOldNum++;
    } else {
      if (existedFolder) {
        console.log(
          chalk.green(`  · Plugin updated : ${p["plugin-id"]}@${newVersion}`)
        );
      } else {
        console.log(
          chalk.green(`  · Plugin installed : ${p["plugin-id"]}@${newVersion}`)
        );
      }
      // update plugin info, keep local original custom-request-options
      if (isCustomRequest) {
        // remove online custom-request-options, such as "Warning!!!"
        delete jsonOL["custom-request-options"];

        newJsonInfo[i] = {
          enable: true,
          "custom-request-options": reqOptions,
          ...jsonOL
        };
      } else {
        newJsonInfo[i] = { enable: true, ...jsonOL };
      }
    }
  } // pluginsInfoArr for end
}

updatePlugins().then(_r => {
  // console.log(newJsonInfo)
  // return

  // all plugins' info same to local origin, skip updating plugin-infos.json
  if (keepOldNum === pluginsInfoArr.length) {
    return console.log(chalk.blue("- Checking bunadmin plugins completed."));
  }

  // write new plugins-info.json
  const savePath = path.resolve(__dirname, pluginsInfo);
  const prettier = require("prettier");
  const preJson = prettier.format(JSON.stringify(newJsonInfo), {
    parser: "json"
  });

  fs.writeFile(savePath, preJson, "utf8", () => {
    // Checking plugins END
    console.log(chalk.white("  · Updated plugins-info.json"));
    console.log(chalk.blue("- Checking bunadmin plugins completed."));
  });
});
