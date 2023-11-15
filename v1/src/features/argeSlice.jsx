import { createSlice } from "@reduxjs/toolkit";


const initialState={
    loading:false,
    error:false,
    designCode:[],
    materialCode:[],
    workCenterCode:[],
    hammaddeCode:[],
    izoStatikPresData:[],
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
            state.error=false
            state.izoStatikPresData=payload

            // return{
            //     ...state,izoStatikPresData:[{
            //         aciklama:payload?.aciklama,
            //         agirlik:payload?.agirlik,
            //         cap:payload?.cap,
            //         catlakkontrol:payload?.catlakkontrol,
            //         date:payload?.date,
            //         dolumsuresi:payload?.dolumsuresi,
            //         granulturu:payload?.granulturu,
            //         hamurunistif:payload?.hamurunistif,
            //         is_merkezi:payload?.is_merkezi,
            //         izobasinc:payload?.izobasinc,
            //         kapamabasinc:payload?.kapamabasinc,
            //         kenar:payload?.kenar,
            //         kontroleden_kisi:payload?.kontroleden_kisi,
            //         pkenar:payload?.pkenar,
            //         rotuskontrol:payload?.rotuskontrol,
            //         taban:payload?.taban,
            //         time:payload?.time,
            //         urun_kodu:payload?.urun_kodu,
            //         uygunsuzluktipi:payload?.uygunsuzluktipi,
            //         vakumdegeri:payload?.vakumdegeri,
            //         vardiya:payload?.vardiya,
            //         varidyasorumlusu:payload?.varidyasorumlusu,
            //         yuzeykontrol:payload?.yuzeykontrol}]
            // }
            
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
    fetchIzoStatikPresData

}=argeSlice.actions

export default argeSlice.reducer




