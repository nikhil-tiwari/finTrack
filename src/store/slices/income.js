import { createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
    name: "incomeSlice",
    initialState: [],
    reducers: {
        addIncome: (state, action) => {
            state.push(action.payload);
            return state;
        },
        clearIncome: () => {
            return [];
        },
    }
})

export const { addIncome, clearIncome } = incomeSlice.actions;

export default incomeSlice.reducer;