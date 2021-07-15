import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

let store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export { store };
