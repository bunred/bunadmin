import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import zh from "./zh"
import en from "./en"
import de from "./de"

i18n.use(initReactI18next).init({
  // we init with resources
  resources: {
    en,
    zh,
    de
  },
  lng: "zh",
  fallbackLng: "zh",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false
  }
})

export default i18n
