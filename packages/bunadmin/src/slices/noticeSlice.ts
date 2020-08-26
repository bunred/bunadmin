import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/utils/store"
import { SeverityType } from "@/core/notice/types"

interface NoticeState {
  title: string
  severity?: SeverityType | null
  content?: string
  key?: string | number
}

const initialState: NoticeState = {
  title: "init-notice"
}

export const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNotice: (state, action: PayloadAction<NoticeState>) => {
      state.title = action.payload.title
      state.severity = action.payload.severity
      state.content = action.payload.content
      state.key = action.payload.key || new Date().getTime() + Math.random()
    }
  }
})

export const { setNotice } = noticeSlice.actions

export const selectNotice = (state: RootState) => state.notice

export default noticeSlice.reducer
