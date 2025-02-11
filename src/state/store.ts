import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from './apiSlice';
import inputReducer from './inputSlice'; // Import the input slice reducer

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        input: inputReducer, // Add input slice to the store
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
