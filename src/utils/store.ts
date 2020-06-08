import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../slices/counterSlice';
import noticeReducer from '../slices/noticeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    notice: noticeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
