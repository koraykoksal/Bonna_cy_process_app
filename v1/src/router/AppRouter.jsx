import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Uygunsuzluk from '../pages/Uygunsuzluk'
import PrivateRouter from './PrivateRouter'
import Register from '../pages/Register'
import Reaktifstandart from '../pages/Reaktifstandart'
import Izostatikpres from '../pages/Izostatikpres'
import Otomatiktorna from '../pages/Otomatiktorna'
import Mandiktornapres from '../pages/Mandiktornapres'
import Yuksekbasinc from '../pages/Yuksekbasinc'
import Dokumhatti from '../pages/Dokumhatti'
import Kulpdokum from '../pages/Kulpdokum'
import Granulkontrol from '../pages/Granulkontrol'
import Astarlama from '../pages/Astarlama'
import Reaktif from '../pages/Reaktif'
import Triyaj from '../pages/Triyaj'
import Sirlama from '../pages/Sirlama'
import Dijitallogo from '../pages/Dijitallogo'
import Dekorlama from '../pages/Dekorlama'
import Dijitalbaski from '../pages/Dijitalbaski'
import Nihaiurunkontrol from '../pages/Nihaiurunkontrol'
import Ayaktaslama from '../pages/Ayaktaslama'
import NotFound from '../pages/NotFound'


const AppRouter = () => {



  return (
    

    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
       
        <Route path='proses' element={<PrivateRouter/>}>
          <Route path='' element={<Dashboard/>}>
          <Route index element={<Home/>}/>
          <Route path='uygunsuzluk' element={<Uygunsuzluk/>}/>
          <Route path='reaktifstandart' element={<Reaktifstandart/>}/>
          <Route path='izostatikpres' element={<Izostatikpres/>}/>
          <Route path='otomatiktorna' element={<Otomatiktorna/>}/>
          <Route path='mandiktornapres' element={<Mandiktornapres/>}/>
          <Route path='yuksekbasinc' element={<Yuksekbasinc/>}/>
          <Route path='dokumhatti' element={<Dokumhatti/>}/>
          <Route path='kulpdokum' element={<Kulpdokum/>}/>
          <Route path='granulkontrol' element={<Granulkontrol/>}/>
          <Route path='astarlama' element={<Astarlama/>}/>
          <Route path='reaktif' element={<Reaktif/>}/>
          <Route path='triyaj' element={<Triyaj/>}/>
          <Route path='sirlama' element={<Sirlama/>}/>
          <Route path='dijitallogo' element={<Dijitallogo/>}/>
          <Route path='dekorlama' element={<Dekorlama/>}/>
          <Route path='dijitalbaski' element={<Dijitalbaski/>}/>
          <Route path='nihaiurunkontrol' element={<Nihaiurunkontrol/>}/>
          <Route path='ayaktaslama' element={<Ayaktaslama/>}/>
          </Route>
          
        </Route>

        <Route path='*' element={<NotFound/>}/>

      </Routes>
    </BrowserRouter>


  )
}

export default AppRouter