import React, { useEffect, useState } from "react"
import IconButton from "@material-ui/core/IconButton"
import { useRouter } from "next/router"
import EvaIcon from "react-eva-icons"
import { useTheme } from "@material-ui/core/styles"
import { DynamicRoute, LocalDataRoute } from "@/utils/routes"
import Badge from "@material-ui/core/Badge"
import { ENV } from "@/utils"

export default function NoticeMenu() {
  const theme = useTheme()
  const router = useRouter()

  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>()
  const ref = React.useRef()
  const [count, setCount] = useState(0)

  const handleMenu = async (_event: React.MouseEvent<HTMLElement>) => {
    await router.push(DynamicRoute, LocalDataRoute.notice)
  }

  async function queryCount() {
    try {
      const customNotificationPath = ENV.NOTIFICATION_PLUGIN
      const { notificationCount } = await import(
        `@plugins/${customNotificationPath}`
      )

      if (!notificationCount) return
      const count = await notificationCount()
      setCount(count)
    } catch (e) {
      // console.error(e)
    }
  }

  useEffect(() => {
    ;(async () => {
      await queryCount()
    })()
  }, [])

  useEffect(() => {
    if (ENV.OFF_NOTIFICATION_INTERVAL_COUNT) {
      // Disabling interval counting is helpful for debugging or reducing server load
      return
    }

    ;(async () => {
      const customNotificationPath = ENV.NOTIFICATION_PLUGIN
      const { notificationCount } = await import(
        `@plugins/${customNotificationPath}`
      )

      if (!notificationCount) return
    })()

    if (intervalID) return () => clearInterval(intervalID)

    const id = setInterval(async () => {
      await queryCount()
    }, 3000)

    // cache intervalID
    setIntervalID(id)
  }, [ref.current])

  return (
    // Notice Icon
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Badge badgeContent={count} color="primary">
          <EvaIcon
            name="bell-outline"
            size="large"
            fill={theme.bunadmin.iconColor}
          />
        </Badge>
      </IconButton>
    </div>
  )
}
