import { configureStore } from "@reduxjs/toolkit";

// Import Reducers
import { user } from "./reducers/user.reducer";
import { staffInfo } from "./reducers/staffInformation.reducer";
import { userInfo } from "./reducers/userInformation.reducer";
import { staffLocation } from "./reducers/staffLocation.reducer";
import { reportImformation } from "./reducers/report.reducer";

export const store = configureStore({
    reducer: {
        user: user.reducer,
        staffInfo: staffInfo.reducer,
        userInfo: userInfo.reducer,
        staffLocation: staffLocation.reducer,
        reportImformation: reportImformation.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
