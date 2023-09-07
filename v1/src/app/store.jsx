import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../features/authSlice"


//created configure store
const store=configureStore({

    reducer:{
        auth:authSlice
    }


})


export default store