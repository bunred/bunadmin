import {
  configureStore,
  ThunkAction,
  Action,
  EnhancedStore,
  AnyAction
} from "@reduxjs/toolkit"
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/src/getDefaultMiddleware"
import counterReducer from "../slices/counterSlice"
import noticeReducer from "../slices/noticeSlice"
import nestedMenuReducer from "../slices/nestedMenuSlice"
import schemaReducer from "../slices/schemaSlice"

export const store: EnhancedStore<
  any,
  AnyAction,
  [ThunkMiddlewareFor<any>]
> = configureStore({
  reducer: {
    counter: counterReducer,
    notice: noticeReducer,
    nestedMenu: nestedMenuReducer,
    schema: schemaReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
