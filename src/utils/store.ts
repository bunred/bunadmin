import {
  configureStore,
  ThunkAction,
  Action,
  EnhancedStore,
  AnyAction
} from "@reduxjs/toolkit"
import counterReducer from "../slices/counterSlice"
import noticeReducer from "../slices/noticeSlice"
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/src/getDefaultMiddleware"

export const store: EnhancedStore<
  any,
  AnyAction,
  [ThunkMiddlewareFor<any>]
> = configureStore({
  reducer: {
    counter: counterReducer,
    notice: noticeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
