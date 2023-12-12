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
    reaktifData:[],
    triyajData:[],
    sirlamaData:[],
    dijitalLogoData:[],
    dekorlamaData:[],
    dijitalBaskiData:[],
    nihaiUrunKontrolData:[],
    ayakTaslamaData:[],
    uygunsuzlukData:[],


    dashboardData:{
        toplamUygunsuzlukMiktar:0,
        toplamKontrolMiktar:0,
        toplamKontrolDetay:{},
        total_control:[],
        uygunsuzluk_control:[],

    }

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
        fetchReaktifData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.reaktifData=payload
        },
        fetchTriyajData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.triyajData=payload
        },
        fetchSirlamaData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.sirlamaData=payload
        },
        fetchDijitalLogoData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.dijitalLogoData=payload
        },
        fetchDekorlamaData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.dekorlamaData=payload
        },
        fetchDijitalBaskiData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.dijitalBaskiData=payload
        },
        fetchNihaiUrunKontrolData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.nihaiUrunKontrolData=payload
        },
        fetchAyakTaslamaData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.ayakTaslamaData=payload
        },
        fetchUygunsuzlukData:(state,{payload})=>{
            state.loading = false;
            state.error=false
            state.uygunsuzlukData=payload
        },
        fetchFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        fetchDashboardData:(state,{payload})=>{
            // console.log("payload: ",payload)
            state.dashboardData.toplamUygunsuzlukMiktar = payload?.uygunsuzlukControl_Count
            state.dashboardData.toplamKontrolMiktar = payload?.totalControlCount

            state.dashboardData.toplamKontrolDetay=payload?.totalControlDetail

            // state.dashboardData.uygunsuzluk_control=[...state.dashboardData.uygunsuzluk_control,{totalCount:payload?.uygunsuzluk?.controlCount,title:payload?.uygunsuzluk.title}]

            // state.dashboardData.total_control=[...state.dashboardData.total_control,{totalCount:payload?.total?.controlCount,title:payload?.total.title}]

            // state.dashboardData.controls=[...state.dashboardData.controls,{toplamUygunsuzlukMiktar:payload?.uygunsuzluk?.controlCount,toplamKontrolMiktar:payload?.total?.controlCount}]

           
        }

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
    fetchAstarlamaData,
    fetchReaktifData,
    fetchTriyajData,
    fetchSirlamaData,
    fetchDijitalLogoData,
    fetchDekorlamaData,
    fetchDijitalBaskiData,
    fetchNihaiUrunKontrolData,
    fetchAyakTaslamaData,
    fetchUygunsuzlukData,
    fetchDashboardData


}=argeSlice.actions

export default argeSlice.reducer




