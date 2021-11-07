import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice/mainSlice";


export default configureStore({
    reducer: {
        main: mainSlice
    }
})