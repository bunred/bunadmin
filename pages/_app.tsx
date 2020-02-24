import React from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import defaultTheme from "../src/utils/themes/defaultTheme"
import CommonSnackbar from "../src/components/CommonSnackbar"
import { SnackbarProvider } from "notistack"
import SnackMessage from "../src/components/CommonSnackbar/Message"

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      // @ts-ignore
      jssStyles.parentElement.removeChild(jssStyles)
    }
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
