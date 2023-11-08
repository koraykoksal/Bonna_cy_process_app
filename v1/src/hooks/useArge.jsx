import axios, { formToJSON } from 'axios'
import { useDispatch } from 'react-redux'
import { designDataSuccess,fetchFail,fetchStart,materialDataSuccess,workCenterDataSuccess,hammaddeDataSuccess } from '../features/argeSlice'
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify'
import { doc, setDoc, Timestamp,collection,addDoc } from "firebase/firestore"; 
import {db} from "../db/firebase_db"

const useArge=()=>{

    const BASE_ADDRESS = `${process.env.REACT_APP_BASEADDRESS}`
    const material = 1
    const desen = 2
    const workcenter = 3
    const argeMaterial = 4

    const dispatch=useDispatch()

    const getDesenCode= async ()=>{

        dispatch(fetchStart())

        try {
            
            const data =await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${desen}`)
            
            const result = data.data

            dispatch(designDataSuccess(result))
         

        } catch (error) {
            dispatch(fetchFail())
            console.log('Desen kod hata : ',error)
            toastErrorNotify(error)
        }
       

    }

    const getWorkCenter= async ()=>{

        dispatch(fetchStart())
      
            
        try {
            
            const data = await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${workcenter}`)

            // const result = data.data.filter(item => item.ISMERKEZI.includes('SK'))
            const result = data.data

            dispatch(workCenterDataSuccess(result))

        } catch (err) {
            dispatch(fetchFail())
            console.log("workcenter hata : ",err)
            toastErrorNotify(err)
        }


       

    }

    const getMaterialCenter= async ()=>{

        dispatch(fetchStart())
      
            
        try {
            
            const data = await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${material}`)

            // const result = data.data.filter(item => item.ISMERKEZI.includes('SK'))
            const result = data.data

            dispatch(materialDataSuccess(result))

        } catch (err) {
            dispatch(fetchFail())
            console.log("material hata : ",err)
            toastErrorNotify(err)
        }


       

    }


    const postIzoStatikPresData=async (info)=>{

        try {

            const res = await addDoc(collection(db,'izo_statik_pres'),info)

            if(res?._key?.path?.segments[1]){
                toastSuccessNotify('Success ✅')
            }
            else{
                toastSuccessNotify('Error ❌')
            }
            
        } catch (error) {
            console.log(error)
        }
    }



    const hammaddeMaterialCode=async()=>{

        dispatch(fetchStart())

        try {

            const data =await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${argeMaterial}`)
            
            const result = data.data

            dispatch(hammaddeDataSuccess(result))
            
        } catch (err) {
            dispatch(fetchFail())
            console.log("hamamdde material hata : ",err)
            toastErrorNotify(err)
        }

    }


    return {
        getDesenCode,
        getWorkCenter,
        getMaterialCenter,
        postIzoStatikPresData,
        hammaddeMaterialCode
    }

}




export default useArge