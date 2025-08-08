import { createSlice } from "@reduxjs/toolkit";
import { getNotificationFromLS } from "@/utils/notificationLS/getNotificationFromLS"; 
import type { NotificationSliceState } from './types'

const { notificationFromLS } = getNotificationFromLS();

const initialState: NotificationSliceState = {
  notificationStatus: notificationFromLS.length === 0 ? false : true,
  notificationInfo: notificationFromLS,
  notificationMessage: "",
  notificationType: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationStatus(state, action) {
      state.notificationStatus = action.payload;
    },
    setNotificatioType(state, action) {
      state.notificationType = action.payload;
    },
    setNotificationInfo(state, action) {
      if (action.payload !== "") {
        state.notificationInfo.push({ item: action.payload.item, message: action.payload.message, type: action.payload.type });
      } else {
        state.notificationInfo = [];
      }
    },
  },
});

export const { setNotificationStatus, setNotificationInfo, setNotificatioType } = notificationSlice.actions;
export default notificationSlice.reducer;
