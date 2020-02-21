import { createMuiTheme } from "@material-ui/core/styles"
import red from "@material-ui/core/colors/red"

const iconColor = "#8f9bb3"
const contentBg = "#EDF1F7"
const contentBoxBg = "#FFF"

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    // add eva icon fill default value
    bunadmin: {
      iconColor: string
      contentBg: string
      contentBoxBg: string
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    bunadmin?: {
      iconColor?: string
      contentBg?: string
      contentBoxBg?: string
    }
  }
}

// Create a defaultTheme instance.
const defaultTheme = createMuiTheme({
  bunadmin: {
    iconColor,
    contentBg,
    contentBoxBg
  },
  palette: {
    primary: {
      main: "#36f"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  },
  typography: {
    body1: {
      fontSize: ".8125rem"
    }
  },
  overrides: {
    // component name
    MuiListItemIcon: {
      root: {
        color: iconColor
      }
    },
    MuiCssBaseline: {
      "@global": {
        // scrollbar start
        "*::-webkit-scrollbar": {
          width: ".4rem"
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#e4e9f2",
          cursor: "pointer",
          borderRadius: ".15625rem"
        }, // scrollbar end
        // eva icon
        ".eva-hover": {
          display: "inherit"
        },
        // MuiTable icon
        ".MuiTable-root .MuiIconButton-root": {
          color: iconColor
        },
        ".MuiTable-root .MuiIconButton-root.Mui-disabled": {
          opacity: 0.5
        }
      }
    }
  }
})

defaultTheme.shadows[1] = "0 0.5rem 1rem 0 rgba(44,51,73,.1)"

export default defaultTheme
