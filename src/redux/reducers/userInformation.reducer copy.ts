import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

// Import interface

// Define initial values
const initial_userInfo = {
    gmail: "" as string,
    username: "" as string,
    uuid: "" as string,
    avatarCode: "" as string,
    role: "" as string,
    reportList: [] as string[],
}

// Export reducer
export const userInfo = createSlice({
    name: "userInformation",
    initialState: initial_userInfo,
    reducers: {
        // Các action trong reducer sẽ được tự động tạo ra
        cacheSetFullUserInformation: (state, action: PayloadAction<typeof initial_userInfo | DocumentData | undefined>) => {
            const payload = action.payload;

            if (
                !payload ||
                typeof payload !== 'object' ||
                Array.isArray(payload) ||
                Object.values(payload).every(value => value === "" || (Array.isArray(value) && value.length === 0) || (typeof value === "object" && Object.keys(value).length === 0))
            ) {
                return state;
            }


            return payload as typeof initial_userInfo;
        },

        cacheSetDefaultUserInformation: (state) => {
            return {...initial_userInfo}
        },
    },
})

export const {
    cacheSetFullUserInformation,
    cacheSetDefaultUserInformation
} = userInfo.actions;

export default userInfo.reducer