import {auth} from "../auth/firebase.js"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,updateProfile } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess } from "../features/authSlice";
import {toastSuccessNotify,toastErrorNotify} from "../helpers/ToastNotify"

const useAuthCall=()=>{

    const navigate=useNavigate()
    const dispatch = useDispatch()

    //* REGISTER
    const signUp= async ({email,password,displayName})=>{


        dispatch(fetchStart())

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            

            const user = userCredential.user;

       
            dispatch(registerSuccess(user))

            updateProfile(auth.currentUser,{displayName:displayName})

            navigate('/proses')
            toastSuccessNotify("Register Success ✅")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch(fetchFail(error))
            toastErrorNotify(`${error.code} ❌`)
        });


        
    }

    //* LOGIN
    const signIn= async ({email,password})=>{

        dispatch(fetchStart())

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          
            const user = userCredential.user;

            dispatch(loginSuccess(user))
            
            navigate('/proses')
            toastSuccessNotify("Login Success ✅")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch(fetchFail(error))
            toastErrorNotify(`${error.code} ❌`)
        });



        
    }

     //* LOGOUT
     const logout= async ()=>{


        dispatch(fetchStart())

        try {
            
           await signOut(auth)

            navigate('/')
            toastSuccessNotify("Logout Success ✅")

        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify('Register Fault ! ❌')
        }

        
    }

    

    return {signUp,signIn,logout}
}



export default useAuthCall