import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DocumentData } from "firebase/firestore";
import type { interface__report__reducer, reportInformationState } from "../../types/interface__Auth";

// Import interface


// Define initial values
const initial_reportInformation: reportInformationState = {
    listReport: []
}

// Export reducer
export const reportImformation = createSlice({
    name: "reportImformation",
    initialState: initial_reportInformation,
    reducers: {
        // Các action trong reducer sẽ được tự động tạo ra
        cacheAddListReport: (state, action: PayloadAction<interface__report__reducer[]>) => {
            const inputListStaff = action.payload
            state.listReport = [...inputListStaff]
        },
    },
})

export const {
    cacheAddListReport
} = reportImformation.actions;

export default reportImformation.reducer