const userPrefix = "/user"

export const UserRoute = {
  login: `${userPrefix}/login`,
  register: `${userPrefix}/register`,
  profile: `${userPrefix}/profile`,
  notice: `${userPrefix}/notice`
}

const localDataPrefix = "/local-data"

export const LocalDataRoute = {
  leftMenu: `${localDataPrefix}/left-menu`,
  notice: `${localDataPrefix}/notice`
}
