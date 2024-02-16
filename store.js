import { configureStore } from "@reduxjs/toolkit";
import navReducer from './slices/navSlice.js'

export default store = configureStore({
    reducer: {
        nav: navReducer,
    },
    });
