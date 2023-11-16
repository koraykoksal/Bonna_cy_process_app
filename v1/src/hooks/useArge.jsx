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
    fetchManDikTornaData

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

            const data = await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${desen}`)

            const result = data.data

            dispatch(designDataSuccess(result))


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
            if(res?.data == null || res?.data == undefined){
                console.log("workcenter code not found")
            }
            else{
                dispatch(workCenterDataSuccess(res?.data))
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

            const data = await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${material}`)

            // const result = data.data.filter(item => item.ISMERKEZI.includes('SK'))
            const result = data?.data
            // console.log("hook material code",result)
            dispatch(materialDataSuccess(result))

        } catch (err) {
            dispatch(fetchFail())
            // console.log("material hata : ", err)
            toastErrorNotify(err)
        }




    }


    const hammaddeMaterialCode = async () => {

        dispatch(fetchStart())

        try {

            const data = await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${argeMaterial}`)

            const result = data?.data
            // console.log("hook  material code:",result)
            dispatch(hammaddeDataSuccess(result))

        } catch (err) {
            dispatch(fetchFail())
            // console.log("hamamdde material hata : ", err)
            toastErrorNotify(err)
        }

    }


    //! firebase data gönder
    const postFireData = async (address,info) => {

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
                if(data == null || data == undefined){
                    console.log("machine data null geliyor:",data)
                }
                else{
                    if(address === 'IzoStatikPresData'){
                        dispatch(fetchIzoStatikPresData(data))
                    }
                    else if(address === 'OtomatikTorna'){
                        dispatch(fetchTornaData(data))
                    }
                    else if(address === 'ManDikTorna'){
                        dispatch(fetchManDikTornaData(data))
                    }
                    
                    
                }
                

            });

        } catch (error) {
            toastErrorNotify('No Get Izo Press Data ❌')
        }


    }

    
    const putFireData=(address,info)=>{

        try {
            
            const db = getDatabase()
            update(ref(db,`${address}/`+info.id),info)
            toastSuccessNotify('Updated Data ✅')

        } catch (error) {
            console.log("Update error :",error)
            toastErrorNotify('Not OK Update ❌')
        }
    }

    //! firebase data silme
    const removeFirebaseData = async (address,id) => {

        console.log("addres:",address,"id",id)

        try {
            const db = getDatabase();
            remove(ref(db, `${address}/${id}`))
            toastSuccessNotify('Data Deleted ✅')
        } catch (error) {
            toastErrorNotify('No Delete Data ❌')
        }
    }



    return {
        getDesenCode,
        getWorkCenter,
        getMaterialCenter,
        hammaddeMaterialCode,
        postFireData,
        getFireData,
        removeFirebaseData,
        putFireData
    }

}




export default useArge