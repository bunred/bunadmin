import React, { Suspense, lazy, useState, useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import { Router } from "react-router"
import { Provider } from "react-redux"
import {
  DEFAULT_AUTH_PLUGIN,
  defaultTheme,
  DynamicDocRoute,
  DynamicRoute,
  IAuthPlugin,
  initData,
  PluginData,
  store,
  UserRoute,
  CubeSpinner,
  Snackbar,
  SnackMessage,
  useTranslation
} from "@bunred/bunadmin"
import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { SnackbarProvider } from "notistack"
import { createBrowserHistory } from "history"

const Home = lazy(() => import("./pages/index"))
const HTTP404 = lazy(() => import("./pages/404"))
const GroupName = lazy(() => import("./pages/[group]-[name]"))

const history = createBrowserHistory()

const App = () => {
  const asPath = window.location.pathname
  const { i18n } = useTranslation()
  const [ready, setReady] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [isProtected, setIsProtected] = useState(false)

  function requirePlugin(path: string) {
    try {
      return require(`./.bunadmin/dynamic/${path}`)
    } catch (err) {
      return null
    }
  }

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
    /**
     * Waiting for dynamic route
     */
    if (asPath === DynamicRoute || asPath === DynamicDocRoute) return
    ;(async () => {
      const authPluginName =
        process.env.REACT_APP_AUTH_PLUGIN || DEFAULT_AUTH_PLUGIN
      const authPlugin: IAuthPlugin = await import(
        `./.bunadmin/dynamic/${authPluginName}`
      )
      let pluginsData: PluginData[] = require("./.bunadmin/dynamic/pluginsData.json")
      const plugins = require("./.bunadmin/dynamic/pluginsData")
      if (plugins && plugins.data)
        pluginsData = [...pluginsData, ...plugins.data]

      /**
       * Initialization data
       */
      await initData({
        i18n,
        authPlugin,
        setIsProtected,
        pluginsData,
        requirePlugin,
        setReady,
        initialized,
        setInitialized
      })
    })()
  }, [asPath, i18n, initialized])

  useEffect(() => {
    if (!isProtected) return

    const path = window.location.pathname
    if (path.indexOf(UserRoute.signIn) >= 0) return

    let toUrl = `${UserRoute.signIn}?redirect=${asPath}`
    toUrl = toUrl.replace(`?redirect=${UserRoute.signIn}`, "")
    toUrl = toUrl.replace(`?redirect=${DynamicRoute}`, "/")
    toUrl = toUrl.replace(`?redirect=${DynamicDocRoute}`, "/")
    window.location.replace(toUrl)
  }, [isProtected, asPath])

  if (!ready) return <CubeSpinner />

  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
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
          <Snackbar />
        </SnackbarProvider>
        <Router history={history}>
          <Suspense fallback={<CubeSpinner />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/:group/:name" component={GroupName} />
              <Route path="*" component={HTTP404} />
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
