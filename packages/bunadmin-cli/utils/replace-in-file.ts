const fs = require("fs")

export default async function replaceInFile(
  filePath: string,
  from: string,
  to: string
): Promise<boolean> {
  let originContent: string = ""
  try {
    originContent = await fs.readFileSync(filePath, "utf8")
  } catch (e) {
    console.error(e)
    return false
  }

  const result = originContent.replace(from, to)

  try {
    await fs.writeFileSync(filePath, result, "utf8")
  } catch (e) {
    console.error(e)
    return false
  }

  return true
}
