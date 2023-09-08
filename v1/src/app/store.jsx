import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"


//created configure store
const store=configureStore({

    reducer:{
        auth:authReducer,
    }


})


export default store