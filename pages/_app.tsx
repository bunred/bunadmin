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
import { useTranslation } from "react-i18next"
import { Collection } from "@/core/schema/collections"
import rxDb from "@/utils/database/rxConnect"
import { Type as SchemaType } from "@/core/schema/types"
import addResource from "@/utils/scripts/addResource"

const App = ({ Component, pageProps }: AppProps) => {
  const { i18n } = useTranslation()
  const Schema = Collection.name

  useEffect(() => {
    ;(async () => {
      // Init Data
      await rxInitData()

      // Add i18n resource
      const db = await rxDb()
      let pathObj: any
      db[Schema].find()
        .exec()
        .then((schemas: []) => {
          schemas.map(({ team, group }: SchemaType) => {
            if (!pathObj) pathObj = {}
            // continue when plugin path added
            if (!pathObj[team + group]) {
              pathObj[team + group] = true
              addResource({ i18n, team, group })
            }
          })
        })

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
