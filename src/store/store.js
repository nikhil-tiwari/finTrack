import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "./slices/income";
import expenseReducer from "./slices/expense";

export const store = configureStore({
    reducer: {
        incomeTransaction: incomeReducer,
        expenseTransaction: expenseReducer,
    }
})