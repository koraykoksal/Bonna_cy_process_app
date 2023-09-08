import { createSlice } from "@reduxjs/toolkit";


const initialState={
    currentUser: null,
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
}

const authSlice=createSlice({

    name:"auth",
    initialState,

    reducers:{
        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
          },
          loginSuccess: (state, {payload}) => {
            state.loading = false;
            state.currentUser = payload?.displayName;
            state.isAdmin = false;
            state.token = payload?.accessToken;
            
          },
          logoutSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.token = null;
          },
          registerSuccess: (state, {payload}) => {
  
            state.loading = false;
            state.currentUser = payload?.displayName;
            state.token = payload?.accessToken;
            state.error = false;
            
          },
          fetchFail: (state) => {
            state.loading = false;
            state.error = true;
          },
    }

})

export const {
    fetchFail,
    fetchStart,
    loginSuccess,
    logoutSuccess,
    registerSuccess
} = authSlice.actions;

export default authSlice.reducer;
