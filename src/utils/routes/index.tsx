const userPrefix = "/user"

export const UserRoute = {
  login: `${userPrefix}/login`,
  register: `${userPrefix}/register`,
  profile: `${userPrefix}/profile`
}

const localDataPrefix = "/local-data"

export const LocalDataRoute = {
  leftMenu: `${localDataPrefix}/left-menu`,
  notice: `${localDataPrefix}/notice`,
  schema: `${localDataPrefix}/schema`,
  migration: `${localDataPrefix}/migration`
}
