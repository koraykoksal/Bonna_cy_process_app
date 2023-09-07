import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Uygunsuzluk from '../pages/Uygunsuzluk'
import PrivateRouter from './PrivateRouter'
import Register from '../pages/Register'

const AppRouter = () => {



  return (
    

    <>


    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Login/>}/>
       <Route path='register' element={<Register/>}/>
       
        <Route path='proses' element={<PrivateRouter/>}>
          <Route path='' element={<Dashboard/>}>
          <Route index element={<Home/>}/>
          <Route path='uygunsuzluk' element={<Uygunsuzluk/>}/>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>


    </>
  )
}

export default AppRouter