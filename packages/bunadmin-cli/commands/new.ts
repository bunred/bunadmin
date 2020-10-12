import copyFolder from "../utils/copy-folder"
import replaceInFile from "../utils/replace-in-file"
import { BUNADMIN_CLI_PATH } from "../utils/config"
const path = require("path")

const sourceFolder = path.resolve(BUNADMIN_CLI_PATH, "templates/typescript")

export default async function newProject(
  name = "my-dashboard"
): Promise<undefined | string> {
  let errors: undefined | string
  // copy template files to target folder
  const targetFolder = path.resolve(name)
  errors = await copyFolder(sourceFolder, targetFolder)
  if (errors) return errors

  // replace {project name} in file: `package.json`
  const packageFile = path.resolve(targetFolder, "package.json")
  return await replaceInFile(packageFile, "bunadmin-typescript", name)
}
