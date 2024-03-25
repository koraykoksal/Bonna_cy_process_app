import Typography from '@mui/material/Typography';
import React from 'react'
import { newBtnStyle, typoStyle } from "../styles/globalStyle"
import { Box,TextField } from '@mui/material';
import UygunsuzlukModal from '../components/modals/UygunsuzlukModal';
import { Formik } from 'formik';
import Button from '@mui/material/Button';
import DeleteModals from '../components/deleteModals/DeleteModals';
import Uygunsuzluk_DataTable from '../components/tables/Uygunsuzluk_DataTable';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import useArge from '../hooks/useArge';
import { HiOutlineSearch } from "react-icons/hi";
import { toastWarnNotify } from '../helpers/ToastNotify';

const Uygunsuzluk = () => {


  let getVardiya = 0;
  const nowData = new Date()
  const currentdatetime = nowData.getDate() + "-" + (nowData.getMonth() + 1) + "-" + nowData.getFullYear()
  const currentTime = nowData.getHours() + ":" + nowData.getMinutes()
  const { currentUser } = useSelector((state) => state.auth)

  const [infoDate, setInfoDate] = useState({
    dateFrom: "",
    dateTo: ""
  })

  const {getFireData,getMaterialCenter, getWorkCenter,getDesenCode} = useArge()
  const { workCenterCode, materialCode, designCode } = useSelector((state) => state.arge)

  const getShift = () => {
    //! padStart(2,'0') metodu ile hedefUzunluk ve eklenecek karakterler olarak iki parametre alır.
    const hour = new Date().getHours().toString().padStart(2,'0')

    if (hour > 8 && hour < 16) {
      getVardiya = 2
    }
    else if (hour > 16 && hour < 23) {
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
    getMaterialCenter()
    getWorkCenter()
    getDesenCode()
    getFireData('Uygunsuzluk')

  }, [])
  
  const handleChangeDate = (e) => {
    const { name, value } = e.target
    setInfoDate({ ...infoDate, [name]: value })
  }

  const handleDateFilter = () => {

    if (infoDate.dateFrom && infoDate.dateTo) {

      //! tarih filtreleme işleminde son seçilen sarih bilgisi localStorage taragında saklanır.
      // localStorage.setItem('lastSelectedDate', JSON.stringify(info))

      getFireData('Uygunsuzluk', infoDate.dateFrom, infoDate.dateTo)

    }
    else {
      toastWarnNotify('Tarih bilgisini kontrol ediniz !')
    }

  }

  return (

    <div>

      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Uygunsuzluk
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Box>
          <Button onClick={handleOpen} variant='outlined' sx={newBtnStyle}>New</Button>
        </Box>


        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, alignItems: 'center', p: 2 }}>
          <Typography>From</Typography>
          <TextField
            required
            id='dateFrom'
            name='dateFrom'
            type='date'
            value={infoDate.dateFrom}
            onChange={handleChangeDate}
          />

          <Typography>To</Typography>
          <TextField
            required
            id='dateTo'
            name='dateTo'
            type='date'
            value={infoDate.dateTo}
            onChange={handleChangeDate}
          />
          <HiOutlineSearch size={30} color='black' onClick={handleDateFilter} cursor={'pointer'} style={{ marginLeft: 15 }} />
        </Box>

      </Box>

      <UygunsuzlukModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} workCenterCode={workCenterCode} materialCode={materialCode} designCode={designCode}/>

      <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info}/>

      <Uygunsuzluk_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info}/>

    </div>


  )
}

export default Uygunsuzluk