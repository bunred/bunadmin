export const DynamicRoute = "/[group]/[name]"

const userPrefix = "/user"

export const UserRoute = {
  login: `${userPrefix}/login`,
  register: `${userPrefix}/register`,
  profile: `${userPrefix}/profile`
}

export const CoreGroupName = "core"

export const LocalDataRoute = {
  leftMenu: `/${CoreGroupName}/left-menu`,
  notice: `/${CoreGroupName}/notice`,
  schema: `/${CoreGroupName}/schema`,
  migration: `/${CoreGroupName}/migration`
}
