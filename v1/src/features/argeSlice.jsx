import { createSlice } from "@reduxjs/toolkit";


const initialState={
    loading:false,
    error:false,
    designCode:[],
    materialCode:[],
    workCenterCode:[],
    hammaddeCode:[],
    izoStatikPresData:[],
    otoTornaData:[],
    manDikTornaData:[],
    yuksekBasincData:[],
    dokumHattiData:[],
    kulpDokumData:[],
    granulKontrolData:[],
    astarlamaData:[],
}


const argeSlice=createSlice({

    name:"arge",
    initialState,
    reducers:{

        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
            state.designCode=[]
            state.materialCode=[]
            state.workCenterCode=[]
            state.hammaddeCode=[]
            state.izoStatikPresData=[]
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
        hammaddeDataSuccess: (state, {payload}) => {
  
            state.loading = false;
            state.error = false;

            state.hammaddeCode = payload
            
        },
        fetchIzoStatikPresData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.izoStatikPresData=payload
        },
        fetchTornaData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.otoTornaData=payload
        },
        fetchManDikTornaData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.manDikTornaData=payload
        },
        fetchYuksekBasincData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.yuksekBasincData=payload
        },
        fetchDokumHattiData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.dokumHattiData=payload
        },
        fetchKulpDokumData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.kulpDokumData=payload
        },
        fetchGranulKontrolData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.granulKontrolData=payload
        },
        fetchAstarlamaData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.astarlamaData=payload
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
    hammaddeDataSuccess,
    fetchIzoStatikPresData,
    fetchTornaData,
    fetchManDikTornaData,
    fetchYuksekBasincData,
    fetchDokumHattiData,
    fetchKulpDokumData,
    fetchGranulKontrolData,
    fetchAstarlamaData


}=argeSlice.actions

export default argeSlice.reducer




