import { MenuType as Type } from "@bunred/bunadmin"

const menus = [
  {
    id: "comp_dialog",
    name: "dialog",
    label: "Dialog",
    slug: "/docs/components/dialog",
    parent: "components"
  },
  {
    id: "comp_notice",
    name: "notice",
    label: "Notice",
    slug: "/docs/components/notice",
    parent: "components"
  },
  {
    id: "comp_table",
    name: "table",
    label: "Table",
    slug: "/docs/components/table",
    parent: "components"
  },
  {
    id: "comp_uploader",
    name: "uploader",
    label: "Uploader",
    slug: "/docs/components/uploader",
    parent: "components"
  },
  {
    id: "comp_drawer",
    name: "drawer",
    label: "Drawer",
    slug: "/docs/components/drawer",
    parent: "components"
  }
] as Type[]

export default menus
