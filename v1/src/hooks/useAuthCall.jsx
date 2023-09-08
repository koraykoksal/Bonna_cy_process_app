import {auth} from "../auth/firebase.js"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess } from "../features/authSlice";
import {toastSuccessNotify,toastErrorNotify} from "../helpers/ToastNotify"

const useAuthCall=()=>{

    const navi=useNavigate()
    const dispatch = useDispatch()

    //* REGISTER
    const signUp= async ({email,password})=>{



        dispatch(fetchStart())

        try {
            
            let {userData}= await createUserWithEmailAndPassword(auth, email, password);

            console.log(userData)

            dispatch(registerSuccess(userData))

            navi('/proses')
            toastSuccessNotify("Register Success ✅")

        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify('Register Fault ! ❌')
        }

        
    }

    //* LOGIN
    const signIn= async ({email,password})=>{


        dispatch(fetchStart())

        try {
            
            let {userData}= await signInWithEmailAndPassword(auth, email, password);

            console.log(userData)

            dispatch(loginSuccess(userData))

            navi('/proses')
            toastSuccessNotify("Login Success ✅")

        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify('Login Fault ! ❌')
        }

        
    }

     //* LOGOUT
     const logout= async ()=>{


        dispatch(fetchStart())

        try {
            
           await signOut(auth)

            navi('/')
            toastSuccessNotify("Logout Success ✅")

        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify('Register Fault ! ❌')
        }

        
    }

    

    return {signUp,signIn,logout}
}



export default useAuthCall