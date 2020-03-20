import React, { useEffect } from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import defaultTheme from "@/utils/themes/defaultTheme"
import CommonSnackbar from "@/components/CommonSnackbar"
import { SnackbarProvider } from "notistack"
import SnackMessage from "@/components/CommonSnackbar/Message"
import rxInitData from "@/utils/database/rxInitData"
import "@/utils/i18n"

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    ;(async () => {
      // Init Data
      await rxInitData()

      const jssStyles = document.querySelector("#jss-server-side")
      if (jssStyles) {
        // @ts-ignore
        jssStyles.parentElement.removeChild(jssStyles)
      }
    })()
  }, [])

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
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
    </>
  )
}

export default App
