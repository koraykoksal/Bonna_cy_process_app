import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import argeReducer from "../features/argeSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)
const persistedReducer2 = persistReducer(persistConfig, argeReducer)

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    arge:persistedReducer2
  },
  devTools: process.env.NODE_ENV !== "production"
})

export const persistor = persistStore(store)
export default store