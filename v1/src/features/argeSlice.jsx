import { createSlice } from "@reduxjs/toolkit";


const initialState={
    loading:false,
    error:false,
    designCode:[],
    materialCode:[],
    workCenterCode:[]
}


const argeSlice=createSlice({

    name:"arge",
    initialState,
    reducers:{

        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        designDataSuccess: (state, {payload}) => {
 
            state.loading = false;
            state.error = false;
            state.designCode = payload
            
        },
        workCenterDataSuccess: (state, {payload}) => {
  
            state.loading = false;
            state.error = false;
            state.workCenterCode=payload
            
        },
        materialDataSuccess: (state, {payload}) => {
  
            state.loading = false;
            state.error = false;

            state.materialCode = payload
            
        },
        fetchFail: (state) => {
            state.loading = false;
            state.error = true;
        },

    }
})


export const {
    fetchStart,
    fetchFail,
    designDataSuccess,
    workCenterDataSuccess,
    materialDataSuccess,
}=argeSlice.actions

export default argeSlice.reducer




