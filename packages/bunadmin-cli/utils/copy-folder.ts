import { copySync } from "fs-extra"

// copy source folder to destination
export default async function copyFolder(
  source: string,
  destination: string
): Promise<boolean> {
  try {
    await copySync(source, destination)
  } catch (e) {
    console.error("An error occured while copying the folder.")
    return false
  }

  return true
}
