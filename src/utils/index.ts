import { store } from "./store";
import { ENV } from "./config";
import i18n from "./i18n";
import { DynamicRoute, UserRoute } from "./routes";
import rxDb from "./database/rxConnect";
import defaultTheme from "./themes/defaultTheme";

import addResource from "./scripts/addResource";
import initData from "./scripts/initData";
import request from "./scripts/request";
import storedToken from "./scripts/storedToken";

export {
  store,
  ENV,
  i18n,
  DynamicRoute,
  UserRoute,
  rxDb,
  defaultTheme,
  addResource,
  initData,
  request,
  storedToken
};
