import {
  configureStore,
  ThunkAction,
  Action,
  EnhancedStore,
  AnyAction
} from "@reduxjs/toolkit"
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/src/getDefaultMiddleware"
import noticeReducer from "../slices/noticeSlice"
import nestedMenuReducer from "../slices/nestedMenuSlice"
import schemaReducer from "../slices/schemaSlice"
import tableReducer from "../slices/tableSlice"

export const store: EnhancedStore<
  any,
  AnyAction,
  [ThunkMiddlewareFor<any>]
> = configureStore({
  reducer: {
    notice: noticeReducer,
    nestedMenu: nestedMenuReducer,
    schema: schemaReducer,
    table: tableReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
