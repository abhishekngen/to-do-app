import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from "../features/tasks/tasksSlice.js";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    }
});