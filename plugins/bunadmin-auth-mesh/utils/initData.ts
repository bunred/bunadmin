import { IPluginData } from "@bunred/bunadmin"

export default {
  plugin: "auth-mesh",
  data: [
    {
      id: "bunadmin_auth_mesh_sign_in",
      group: "auth-mesh",
      name: "sign-in",
      label: "Sign-in",
      team: "bunadmin",
      customized: true,
      ignore_menu: true
    },
    {
      id: "bunadmin_auth_mesh_users",
      group: "auth-mesh",
      name: "users",
      label: "User",
      team: "bunadmin",
      customized: true,
      icon_type: "eva",
      icon: "person-outline",
      rank: "100"
    },
    {
      id: "bunadmin_auth_mesh_roles",
      group: "auth-mesh",
      name: "roles",
      label: "Role",
      team: "bunadmin",
      customized: true,
      icon_type: "eva",
      icon: "people-outline",
      rank: "100"
    }
  ] as IPluginData[]
}
