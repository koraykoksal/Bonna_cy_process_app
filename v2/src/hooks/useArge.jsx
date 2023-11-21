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
    fetchUygunsuzlukData

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
    const [todos, setTodos] = useState([]);
    const dispatch = useDispatch();



    const getDesenCode = async () => {

        dispatch(fetchStart())

        try {

            const res = await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${desen}`)

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
            // console.log("hook workcenter",res)
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

        const database = getDatabase();
        const databaseRef = ref(database);

        onValue(databaseRef, (snapshot) => {
            const data = snapshot.val();
            console.log("Tüm veritabanı: ", data);
            // Tüm veritabanı şimdi "data" değişkeninde
        }, {
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