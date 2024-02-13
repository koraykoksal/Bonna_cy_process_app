import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {useSelector} from "react-redux"


const PrivateRouter = () => {

  const {currentUser} = useSelector((state)=>state.auth)

  // const currentUser = 'Koray'

  return (

    currentUser ? <Outlet/> : <Navigate to="/"/>

  )
}

export default PrivateRouter