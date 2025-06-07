import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Import interface

// Define initial values
const initial_user  = {
    gmail: "",
    role: "",
}

// Export reducer
export const user = createSlice({
    name: "userInformation",
    initialState: initial_user,
    reducers: {
        // Các action trong reducer sẽ được tự động tạo ra
        cacheSetUser: (state, action: PayloadAction<{inputGmail: string, inputRole: string}>) => {
            const inputData = action.payload

            state.gmail = inputData.inputGmail
            state.role = inputData.inputRole
        },
    },
})

export const {
    cacheSetUser,
} = user.actions;

export default user.reducer