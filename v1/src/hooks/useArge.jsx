import axios, { formToJSON } from 'axios'
import { useDispatch } from 'react-redux'
import { designDataSuccess,workCenterDataSuccess } from '../features/argeSlice'


const useArge=()=>{

    const BASE_ADDRESS = `${process.env.REACT_APP_BASEADDRESS}`
    const desen = 2
    const workcenter = 3

    const dispatch=useDispatch(9)

    const getDesenCode= async ()=>{

        try {
            
            axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${desen}`)
            .then((res)=>{

                // console.log(res)
                dispatch(designDataSuccess(res.data))

            })
            .catch((err)=>{
                console.log(err)
            })

         

        } catch (error) {
            console.log('hata : ',error)
        }
       

    }

    const getWorkCenter= async ()=>{

      
            
        try {
            
            const data = await axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${workcenter}`)

            const result = data.data.filter(item => item.ISMERKEZI.includes('SK'))

           
            dispatch(workCenterDataSuccess(result))

        } catch (err) {
            console.log(err)
            
        }


       

    }


    return {getDesenCode,getWorkCenter}

}


export default useArge