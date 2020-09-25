import React, { useEffect, useState } from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import defaultTheme from "@/utils/themes/defaultTheme"
import CommonSnackbar from "@/components/CommonSnackbar"
import { SnackbarProvider } from "notistack"
import SnackMessage from "@/components/CommonSnackbar/Message"
import "@/utils/i18n"
import { useTranslation } from "react-i18next"
import initData from "@/utils/scripts/initData"
import { Provider } from "react-redux"
import { store } from "@/utils/store"
import { useRouter } from "next/router"
import CubeSpinner from "@/components/CommonBgs/CubeSpinner"
import { DynamicDocRoute, DynamicRoute } from "@/utils"

const App = ({ Component, pageProps }: AppProps) => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const { asPath } = router
  const [ready, setReady] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    ;(async () => {
      const jssStyles = document.querySelector("#jss-server-side")
      if (jssStyles) {
        // @ts-ignore
        jssStyles.parentElement.removeChild(jssStyles)
      }
    })()
  }, [])

  useEffect(() => {
    // Waiting for dynamic route
    if (asPath === DynamicRoute || asPath === DynamicDocRoute) return
    ;(async () => {
      // Init Data
      await initData({ i18n, router, setReady, initialized, setInitialized })
    })()
  }, [asPath])

  if (!ready) return <CubeSpinner />

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* Snackbar / Notice */}
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            autoHideDuration={2000}
            content={(key, message) => (
              <SnackMessage id={key} message={message} />
            )}
          >
            <CommonSnackbar />
          </SnackbarProvider>
          {/* Core component */}
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App
