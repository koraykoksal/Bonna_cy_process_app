import axios from 'axios'
import { useDispatch } from 'react-redux'
import { designDataSuccess } from '../features/argeSlice'


const useArge=()=>{

    const BASE_ADDRESS = `${process.env.REACT_APP_BASEADDRESS}`
    const desen = 2

    const dispatch=useDispatch(9)

    const getDesenCode= async ()=>{

        try {
            
            axios(`http://172.41.11.5:3019/butunbiApi/getArges?PARAMS=${desen}`)
            .then((res)=>{
                //console.log(res.data)
                dispatch(designDataSuccess(res.data))

            })
            .catch((err)=>{
                console.log(err)
            })

         

        } catch (error) {
            console.log('hata : ',error)
        }
       

    }


    return {getDesenCode}

}


export default useArge