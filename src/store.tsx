import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./services/postsApi";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [postsApi.reducerPath]: postsApi.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsApi.middleware),
})