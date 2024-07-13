import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: "expenseSlice",
    initialState: [],
    reducers: {
        addExpense: (state, action) => {
            state.push(action.payload);
            return state;
        },
        clearExpense: () => {
            return [];
        },
    }
})

export const { addExpense, clearExpense } = expenseSlice.actions;

export default expenseSlice.reducer;