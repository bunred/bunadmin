export const Primary = "name"

export const Schema = {
  title: "Local Left Menu",
  description: "left menus",
  version: 0,
  type: "object",
  properties: {
    [Primary]: {
      type: "string",
      primary: true
    },
    label: {
      type: "string"
    },
    slug: {
      type: "string"
    },
    rank: {
      type: "string",
      default: "0",
      index: true
    },
    parent: {
      ref: "left_menu", // refers to collection left_menu
      type: "string" // ref-values must always be string (primary of foreign RxDocument)
    }
  },
  required: ["slug"]
}
