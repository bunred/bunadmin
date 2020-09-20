import { MenuType as Type } from "@bunred/bunadmin"
import gettingStarted from "./getting_started"
import core from "./core"
import components from "./components"

const menus = [
  {
    id: "getting-started",
    name: "getting-started",
    label: "Getting Started",
    parent: "",
    rank: "100",
    icon_type: "eva",
    icon: "paper-plane-outline"
  },
  {
    id: "core",
    name: "core",
    label: "Core",
    parent: "",
    rank: "100",
    icon_type: "eva",
    icon: "cube-outline"
  },
  {
    id: "comp",
    name: "components",
    label: "Components",
    parent: "",
    rank: "100",
    icon_type: "eva",
    icon: "layers-outline"
  },
  {
    id: "plugin",
    name: "plugins",
    label: "Plugins",
    parent: "",
    rank: "100",
    icon_type: "eva",
    icon: "attach-outline"
  },
  ...gettingStarted,
  ...core,
  ...components
] as Type[]

export default menus
