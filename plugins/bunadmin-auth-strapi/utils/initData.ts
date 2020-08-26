import { IPluginData } from "@bunred/bunadmin"

export default {
  plugin: "auth-strapi",
  data: [
    {
      id: "bunadmin_auth_strapi_sign_in",
      group: "auth-strapi",
      name: "sign-in",
      label: "Sign-in",
      team: "bunadmin",
      customized: true,
      ignore_menu: true
    },
    {
      id: "bunadmin_auth_strapi_users",
      group: "auth-strapi",
      name: "users",
      label: "User",
      team: "bunadmin",
      customized: true,
      icon_type: "eva",
      icon: "person-outline",
      rank: "100"
    },
    {
      id: "bunadmin_auth_strapi_roles",
      group: "auth-strapi",
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
