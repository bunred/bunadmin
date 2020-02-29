export const Primary = "id"

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
    name: {
      type: "string",
      index: true
    },
    label: {
      type: "string"
    },
    slug: {
      type: "string"
    },
    icon: {
      type: "string"
    },
    icon_type: {
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
  required: ["name", "slug"]
}
