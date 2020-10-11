import copyFolder from "./utils/copy-folder"
import replaceInFile from "./utils/replace-in-file"
const path = require("path")

const sourceFolder = path.resolve("../templates/typescript")

export default async function newProject(
  name = "my-dashboard"
): Promise<boolean> {
  let success: boolean
  // copy template files to target folder
  const targetFolder = path.resolve(name)
  success = await copyFolder(sourceFolder, targetFolder)
  if (!success) return false

  // replace {project name} in file: `package.json`
  const packageFile = path.resolve(targetFolder, "package.json")
  success = await replaceInFile(packageFile, "bunadmin-typescript", name)
  return success
}
