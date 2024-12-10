// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import exercisesReducer from "./slices/exercisesSlice";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer, // Temporary global state
    [apiSlice.reducerPath]: apiSlice.reducer, // API caching and querying
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
