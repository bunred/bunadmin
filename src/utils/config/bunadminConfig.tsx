interface ConfigTypes {
  userUrl: string
  shopUrl: string
}

const userDomain = "http://192.168.3.2:51800"
const userPrefix = "/api/v1"
const userUrl = userDomain + userPrefix

const bunadminConfig = {
  userUrl
} as ConfigTypes

export default bunadminConfig
