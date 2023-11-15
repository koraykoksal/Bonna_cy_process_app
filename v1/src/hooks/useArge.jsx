import axios, { formToJSON } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
    designDataSuccess,
    fetchFail,
    fetchStart,
    materialDataSuccess,
    hammaddeDataSuccess,
    fetchIzoStatikPresData,
    workCenterDataSuccess

} from '../features/argeSlice'
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify'
import { doc, setDoc, Timestamp, collection, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../db/firebase_db"
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
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

            dispatch(workCenterDataSuccess(res?.data))

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

            dispatch(hammaddeDataSuccess(result))

        } catch (err) {
            dispatch(fetchFail())
            // console.log("hamamdde material hata : ", err)
            toastErrorNotify(err)
        }

    }


    //! firebase data gönder
    const postIzoStatikPresData = async (info) => {

        console.log("info",info)
        
        dispatch(fetchStart())

        try {

            const userId = uid()
            const db = getDatabase();
            set(ref(db, 'IzoStatikPresData/' + userId), info);
            toastSuccessNotify('Data Added ✅')

        } catch (error) {
            toastErrorNotify('No Add Izo Statik Press Data ❌')
        }


    }


    //! firebase data çek
    const getIzoStatikPresData = async () => {

        dispatch(fetchStart())

        try {
            
            const db = getDatabase();
            const starCountRef = ref(db, 'IzoStatikPresData/');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                dispatch(fetchIzoStatikPresData(data))
                // updateStarCount(postElement, data);
            });

        } catch (error) {
            toastErrorNotify('No Get Izo Press Data ❌')
        }
       

    }


    //! firebase data silme
    const removeFirebaseData=(info)=>{
        
        try {
            const db = getDatabase();
            remove(ref(db,`IzoStatikPresData/${info.id}`))
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
        postIzoStatikPresData,
        getIzoStatikPresData,
        removeFirebaseData,
    }

}




export default useArge