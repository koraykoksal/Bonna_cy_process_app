import axios, { formToJSON } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
    designDataSuccess,
    fetchFail,
    fetchStart,
    materialDataSuccess,
    hammaddeDataSuccess,
    fetchIzoStatikPresData,
    workCenterDataSuccess,
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
    fetchUygunsuzlukData,fetchDashboardData

} from '../features/argeSlice'
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify'
import { doc, setDoc, Timestamp, collection, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../db/firebase_db"
import { getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid";
import { useState } from 'react';

const useArge = () => {

    const BASE_ADDRESS = `${process.env.REACT_APP_BASEADDRESS}`
    const material = 1
    const desen = 2
    const workcenter = 3
    const argeMaterial = 4

    const { userID } = useSelector((state) => state.auth)
    const {dashboardData} = useSelector((state)=>state.arge)
    const dispatch = useDispatch();



    const getDesenCode = async () => {

        dispatch(fetchStart())

        try {

            const res = await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${desen}`)

            // console.log("desen kodu: ",res?.data)

            if (res?.data == null || res?.data == undefined) {
                console.log("design code not found")
            }
            else {
                dispatch(designDataSuccess(res?.data))
            }




        } catch (error) {
            dispatch(fetchFail())
            // console.log('Desen kod hata : ', error)
            toastErrorNotify(error)
        }


    }


    const getWorkCenter = async () => {

        dispatch(fetchStart())


        try {

            const res = await axios.get(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${workcenter}`)
            
            // console.log("iş merkezi : ",res?.data)

            if (res?.data == null || res?.data == undefined) {
                console.log("workcenter code not found")
            }
            else {

                const result = res?.data?.filter((item) => item.TESIS === '01')
                dispatch(workCenterDataSuccess(result))
            }


        } catch (err) {
            dispatch(fetchFail())
            // console.log("workcenter hata : ", err)
            toastErrorNotify(err)
        }


    }


    const getMaterialCenter = async () => {

        dispatch(fetchStart())


        try {

            const res = await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${material}`)

            // console.log("material kodu: ",res?.data)

            if (res?.data == null || res?.data == undefined) {
                console.log("material code not found")
            }
            else {
                dispatch(materialDataSuccess(res?.data))
            }


        } catch (err) {
            dispatch(fetchFail())
            // console.log("material hata : ", err)
            toastErrorNotify(err)
        }

    }



    const hammaddeMaterialCode = async () => {

        dispatch(fetchStart())

        try {

            const res = await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${argeMaterial}`)

            // console.log("hammadde kodu: ",res?.data)

            if (res?.data == null || res?.data == undefined) {
                console.log("hammadde code not found")
            }
            else {
                dispatch(hammaddeDataSuccess(res?.data))
            }


        } catch (err) {
            dispatch(fetchFail())
            // console.log("hamamdde material hata : ", err)
            toastErrorNotify(err)
        }

    }


    //! firebase data gönder
    const postFireData = async (address, info) => {

        console.log("info", info)

        dispatch(fetchStart())

        try {

            const uID = uid()
            const db = getDatabase();
            set(ref(db, `${address}/` + uID), info);
            toastSuccessNotify('Data Added ✅')

        } catch (error) {
            toastErrorNotify('No Add Izo Statik Press Data ❌')
        }


    }


    //! firebase data çek
    const getFireData = async (address) => {

        dispatch(fetchStart())

        try {

            const db = getDatabase();
            const starCountRef = ref(db, `${address}/`);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();

                if (data == null || data == undefined) {
                    console.log("machine data null geliyor:", data)
                }
                else {
                    if (address === 'IzoStatikPresData') {
                        dispatch(fetchIzoStatikPresData(data))
                    }
                    else if (address === 'OtomatikTorna') {
                        dispatch(fetchTornaData(data))
                    }
                    else if (address === 'ManDikTorna') {
                        dispatch(fetchManDikTornaData(data))
                    }
                    else if (address === 'YuksekBasinc') {
                        dispatch(fetchYuksekBasincData(data))
                    }
                    else if (address === 'DokumHatti') {
                        dispatch(fetchDokumHattiData(data))
                    }
                    else if (address === 'KulpDokum') {
                        dispatch(fetchKulpDokumData(data))
                    }
                    else if (address === 'GranulKontrol') {
                        dispatch(fetchGranulKontrolData(data))
                    }
                    else if (address === 'Astarlama') {
                        dispatch(fetchAstarlamaData(data))
                    }
                    else if (address === 'Reaktif') {
                        dispatch(fetchReaktifData(data))
                    }
                    else if (address === 'Triyaj') {
                        dispatch(fetchTriyajData(data))
                    }
                    else if (address === 'Sirlama') {
                        dispatch(fetchSirlamaData(data))
                    }
                    else if (address === 'DijitalLogo') {
                        dispatch(fetchDijitalLogoData(data))
                    }
                    else if (address === 'Dekorlama') {
                        dispatch(fetchDekorlamaData(data))
                    }
                    else if (address === 'DijitalBaski') {
                        dispatch(fetchDijitalBaskiData(data))
                    }
                    else if (address === 'NihaiUrunKontrol') {
                        dispatch(fetchNihaiUrunKontrolData(data))
                    }
                    else if (address === 'AyakTaslama') {
                        dispatch(fetchAyakTaslamaData(data))
                    }
                    else if (address === 'Uygunsuzluk') {
                        dispatch(fetchUygunsuzlukData(data))
                    }

                }


            });

        } catch (error) {
            toastErrorNotify('No Get Izo Press Data ❌')
        }


    }


    const putFireData = (address, info) => {

        try {

            const db = getDatabase()
            update(ref(db, `${address}/` + info.id), info)
            toastSuccessNotify('Updated Data ✅')

        } catch (error) {
            console.log("Update error :", error)
            toastErrorNotify('Not OK Update ❌')
        }
    }

    //! firebase data silme
    const removeFirebaseData = async (address, id) => {

        try {
            const db = getDatabase();
            remove(ref(db, `${address}/${id}`))
            toastSuccessNotify('Data Deleted ✅')
        } catch (error) {
            toastErrorNotify('No Delete Data ❌')
        }
    }


    //! tüm veritabanı bilgileri
    const readFireData = async () => {

        const allDashboard_Data={
            uygunsuzlukControl_Count:0,
            totalControlCount:0,
            totalControlDetail:{},
            // total:{
            //     controlCount:0,
            //     title:""
            // },
            // uygunsuzluk:{
            //     controlCount:0,
            //     title:""
            // }
        }


        const database = getDatabase();
        const databaseRef = ref(database);

        onValue(databaseRef, (snapshot) => {
            const data = snapshot.val();

            const tt = Object.keys(data)

            tt.forEach(element => {
                
                
                if (element === 'OtomatikTorna') {
                    const OtomatikTorna = data[element]
                    // console.log("otomatik torna: ",OtomatikTorna)
                }
                else if (element === 'ManDikTorna') {
                    const ManDikTorna = data[element]
                    // console.log("man dik torna: ",ManDikTorna)
                }
                else if (element === 'YuksekBasinc') {
                    const YuksekBasinc = data[element]
                    // console.log("yüksek basınç: ",YuksekBasinc)
                }
                else if (element === 'DokumHatti') {
                    const DokumHatti = data[element]
                    // console.log("dokum hattı: ",DokumHatti)
                }
                else if (element === 'KulpDokum') {
                    const KulpDokum = data[element]
                    // console.log("kulp doküm: ",KulpDokum)
                }
                else if (element === 'GranulKontrol') {
                    const GranulKontrol = data[element]
                    // console.log("granül kontrol: ",GranulKontrol)
                }
                else if (element === 'Astarlama') {
                    const Astarlama = data[element]
                    // console.log("astarlama: ",Astarlama)
                }
                else if (element === 'Reaktif') {
                    const Reaktif = data[element]
                    // console.log("reaktif: ",Reaktif)
                }
                else if (element === 'Triyaj') {
                    const Triyaj = data[element]
                    // console.log("triyaj: ",Triyaj)
                }
                else if (element === 'Sirlama') {
                    const Sirlama = data[element]
                    // console.log("sırlama: ",Sirlama)
                }
                else if (element === 'DijitalLogo') {
                    const DijitalLogo = data[element]
                    // console.log("dijital logo: ",DijitalLogo)
                }
                else if (element === 'Dekorlama') {
                    const Dekorlama = data[element]
                    // console.log("dekorlama: ",Dekorlama)
                }
                else if (element === 'DijitalBaski') {
                    const DijitalBaski = data[element]
                    // console.log("dijital baskı: ",DijitalBaski)
                }
                else if (element === 'NihaiUrunKontrol') {
                    const NihaiUrunKontrol = data[element]
                    // console.log("nihai ürün kontrol: ",NihaiUrunKontrol)
                }
                else if (element === 'AyakTaslama') {
                    const AyakTaslama = data[element]
                    // console.log("ayak taslama: ",AyakTaslama)
                }
                else if (element === 'Uygunsuzluk') {
                    const uygunsuzluk = data[element]

                    let controlCount = 0
                   
                    for(let key in uygunsuzluk){
                        
                        if(uygunsuzluk.hasOwnProperty(key)){
                            controlCount += 1
                        }

                        allDashboard_Data.uygunsuzlukControl_Count=controlCount
                    }
                }
                
            });

            
            let sumDataCount = 0

            for(let key in data){

                if(data.hasOwnProperty(key) == 'Uygunsuzluk'){
                    continue
                }
                else{
                    sumDataCount += 1
                    
                }
                allDashboard_Data.totalControlCount=sumDataCount

                // tüm dataların detayları
                allDashboard_Data.totalControlDetail=data
                
            }

            dispatch(fetchDashboardData(allDashboard_Data))
            
            

        }, 
        {
            onlyOnce: true // Bu, veri yalnızca bir kez okunacağı anlamına gelir
        });

    }


    
    return {
        getDesenCode,
        getWorkCenter,
        getMaterialCenter,
        hammaddeMaterialCode,
        postFireData,
        getFireData,
        removeFirebaseData,
        putFireData,
        readFireData
    }

}




export default useArge