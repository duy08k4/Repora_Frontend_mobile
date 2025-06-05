import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Import interface

// Define initial values
const initial_userInformation  = {
    username: "",
    gmail: "",
    uuid: "",
    avartarCode: "",
    friends: [],
    requests: [],
    setting: {},
    listChatCode: [],
    lastMessage: {},
    fullFriendInformation: [],
    profileStatus: ""
}

// Export reducer
export const userInformation = createSlice({
    name: "userInformation",
    initialState: initial_userInformation,
    reducers: {
        // Các action trong reducer sẽ được tự động tạo ra
        cacheSetName: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
})

export const {
    cacheSetName,
} = userInformation.actions;

export default userInformation.reducer