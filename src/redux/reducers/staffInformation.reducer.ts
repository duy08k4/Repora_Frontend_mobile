import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

// Import interface

// Define initial values
const initial_staffInfo = {
    gmail: "" as string,
    username: "" as string,
    uuid: "" as string,
    avatarCode: "" as string,
    role: "" as string,
    taskList: [] as string[],
    taskDone: [] as string[]
}

// Export reducer
export const staffInfo = createSlice({
    name: "userInformation",
    initialState: initial_staffInfo,
    reducers: {
        // Các action trong reducer sẽ được tự động tạo ra
        cacheSetFullStaffInformation: (state, action: PayloadAction<typeof initial_staffInfo | DocumentData | undefined>) => {
            const payload = action.payload;

            if (
                !payload ||
                typeof payload !== 'object' ||
                Array.isArray(payload) ||
                Object.values(payload).every(value => value === "" || (Array.isArray(value) && value.length === 0) || (typeof value === "object" && Object.keys(value).length === 0))
            ) {
                return state;
            }


            return payload as typeof initial_staffInfo;
        },

        cacheSetDefaultStaffInformation: (state) => {
            return { ...initial_staffInfo }
        },
    },
})

export const {
    cacheSetFullStaffInformation,
    cacheSetDefaultStaffInformation
} = staffInfo.actions;

export default staffInfo.reducer