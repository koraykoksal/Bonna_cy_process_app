import Typography from '@mui/material/Typography';
import React from 'react'
import { typoStyle } from "../styles/globalStyle"
import { Box } from '@mui/material';
import UygunsuzlukModal from '../components/modals/UygunsuzlukModal';
import { Formik } from 'formik';
import Button from '@mui/material/Button';
import DeleteModals from '../components/deleteModals/DeleteModals';
import Uygunsuzluk_DataTable from '../components/tables/Uygunsuzluk_DataTable';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import useArge from '../hooks/useArge';


const Uygunsuzluk = () => {


  let getVardiya = 0;
  const nowData = new Date()
  const currentdatetime = nowData.getDate() + "-" + (nowData.getMonth() + 1) + "-" + nowData.getFullYear()
  const currentTime = nowData.getHours() + ":" + nowData.getMinutes()

  const { currentUser } = useSelector((state) => state.auth)

  const {getFireData,readFireData} = useArge()

  const getShift = () => {
    const now = new Date().getHours()

    if (now > 8 && now < 16) {
      getVardiya = 2
    }
    else if (now > 16 && now < 23) {
      getVardiya = 3
    }
    else {
      getVardiya = 1
    }

    return getVardiya

  }

  const [info, setInfo] = useState({
    is_merkezi: "",
    renk_kodu: "",
    urun_kodu: "",
    sorun_tipi: "",
    uygunsuz_deger: "",
    standart_deger: "",
    aksiyon_sahibi: "",
    aciklama: "",
    aksiyon: "",
    vardiya: getShift(),
    date: currentdatetime.toString(),
    time: currentTime.toString(),
    kontroleden_kisi: currentUser
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setInfo({
      is_merkezi: "",
      renk_kodu: "",
      urun_kodu: "",
      sorun_tipi: "",
      uygunsuz_deger: "",
      standart_deger: "",
      aksiyon_sahibi: "",
      aciklama: "",
      aksiyon: "",
      vardiya: getShift(),
      date: currentdatetime.toString(),
      time: currentTime.toString(),
      kontroleden_kisi: currentUser
    })
  }

  const [delOpen, setdelOpen] = React.useState(false);
  const delHandleOpen = () => setdelOpen(true);
  const delHandleClose = () => setdelOpen(false);


  useEffect(() => {
    getFireData('Uygunsuzluk')
    readFireData()
  }, [])
  


  return (

    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Uygunsuzluk
      </Typography>

      <Button onClick={handleOpen} variant='outlined'>New</Button>

      <UygunsuzlukModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} />

      <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info}/>

      <Uygunsuzluk_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info}/>

    </div>


  )
}

export default Uygunsuzluk