import { ENV } from "@/utils"

export { default as dataToGql } from "./dataToGql"
export { default as handleSpecialPlugin } from "./handleSpecialPlugin"
export { default as initData } from "./initData"
export { fixTreeDataTr } from "./muiTable"
export { default as request } from "./request"
export { default as storedToken } from "./storedToken"

/**
 * handle PATHS_WITHOUT_LAYOUT
 * @param group
 * @param name
 */
export function withoutLayout(
  group: string | string[],
  name: string | string[]
): boolean {
  const path = `/${group}/${name}`
  for (let i = 0; i < ENV.PATHS_WITHOUT_LAYOUT.length; i++) {
    const item = ENV.PATHS_WITHOUT_LAYOUT[i]
    const itemRegx = new RegExp(`${item}.*`, "g")
    if (itemRegx.test(path)) return true
  }

  return false
}
