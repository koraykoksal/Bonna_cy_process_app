import axios, { formToJSON } from 'axios'
import { useDispatch } from 'react-redux'
import { designDataSuccess,fetchFail,fetchStart,materialDataSuccess,workCenterDataSuccess } from '../features/argeSlice'
import { toastErrorNotify } from '../helpers/ToastNotify'


const useArge=()=>{

    const BASE_ADDRESS = `${process.env.REACT_APP_BASEADDRESS}`
    const material = 1
    const desen = 2
    const workcenter = 3

    const dispatch=useDispatch(9)

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


    return {getDesenCode,getWorkCenter,getMaterialCenter}

}


export default useArge