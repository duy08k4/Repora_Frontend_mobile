import { configureStore } from "@reduxjs/toolkit";

// Import Reducers
import { user } from "./reducers/user.reducer";
import { staffInfo } from "./reducers/staffInformation.reducer";
import { userInfo } from "./reducers/userInformation.reducer copy";

export const store = configureStore({
    reducer: {
        user: user.reducer,
        staffInfo: staffInfo.reducer,
        userInfo: userInfo.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
