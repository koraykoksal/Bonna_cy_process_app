import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    error: false,
    designCode: [],
    materialCode: [],
    workCenterCode: [],
    hammaddeCode: [],
    izoStatikPresData: [],
    otoTornaData: [],
    manDikTornaData: [],
    yuksekBasincData: [],
    dokumHattiData: [],
    kulpDokumData: [],
    granulKontrolData: [],
    granulTaneKontrolData: [],
    astarlamaData: [],
    reaktifData: [],
    triyajData: [],
    sirlamaData: [],
    dijitalLogoData: [],
    dekorlamaData: [],
    dijitalBaskiData: [],
    nihaiUrunKontrolData: [],
    ayakTaslamaData: [],
    uygunsuzlukData: [],

    dbData:[],

    dashboardData: {
        toplamUygunsuzlukMiktar: 0,
        toplamKontrolMiktar: 0,
        toplamKontrolDetay: {},
        total_control: [],
        uygunsuzluk_control: [],

    }

}


const argeSlice = createSlice({

    name: "arge",
    initialState,
    reducers: {

        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
            state.designCode = []
            state.materialCode = []
            state.workCenterCode = []
            state.hammaddeCode = []
            state.izoStatikPresData = []
        },
        designDataSuccess: (state, { payload }) => {

            state.loading = false;
            state.error = false;
            state.designCode = payload

        },
        workCenterDataSuccess: (state, { payload }) => {

            state.loading = false;
            state.error = false;
            state.workCenterCode = payload

        },
        materialDataSuccess: (state, { payload }) => {

            state.loading = false;
            state.error = false;

            state.materialCode = payload

        },
        hammaddeDataSuccess: (state, { payload }) => {

            state.loading = false;
            state.error = false;

            state.hammaddeCode = payload

        },
        fetchIzoStatikPresData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.izoStatikPresData = payload
        },
        fetchTornaData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.otoTornaData = payload
        },
        fetchManDikTornaData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.manDikTornaData = payload
        },
        fetchYuksekBasincData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.yuksekBasincData = payload
        },
        fetchDokumHattiData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.dokumHattiData = payload
        },
        fetchKulpDokumData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.kulpDokumData = payload
        },
        fetchGranulKontrolData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.granulKontrolData = payload
        },
        fetchAstarlamaData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.astarlamaData = payload
        },
        fetchReaktifData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.reaktifData = payload
        },
        fetchTriyajData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.triyajData = payload
        },
        fetchSirlamaData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.sirlamaData = payload
        },
        fetchDijitalLogoData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.dijitalLogoData = payload
        },
        fetchDekorlamaData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.dekorlamaData = payload
        },
        fetchDijitalBaskiData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.dijitalBaskiData = payload
        },
        fetchNihaiUrunKontrolData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.nihaiUrunKontrolData = payload
        },
        fetchAyakTaslamaData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.ayakTaslamaData = payload
        },
        fetchUygunsuzlukData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.uygunsuzlukData = payload
        },
        fetchDashboardData: (state, { payload }) => {

            state.dashboardData.toplamUygunsuzlukMiktar = payload?.uygunsuzlukControl_Count

            state.dashboardData.toplamKontrolMiktar = payload?.totalControlCount

            state.dashboardData.toplamKontrolDetay = payload?.totalControlDetail

            state.dbData = payload?.totalControlDetail

        },
        fetchGranulTaneKontrolData: (state, { payload }) => {
            state.loading = false;
            state.error = false
            state.granulTaneKontrolData = payload
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
    fetchDashboardData,
    fetchGranulTaneKontrolData


} = argeSlice.actions

export default argeSlice.reducer




