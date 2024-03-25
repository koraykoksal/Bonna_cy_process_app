import React from 'react'
import { newBtnStyle, typoStyle } from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import DekorlamaModal from '../components/modals/DekorlamaModal';
import { useSelector } from 'react-redux';
import useArge from '../hooks/useArge';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteModals from '../components/deleteModals/DeleteModals';
import Dekorlama_DataTable from '../components/tables/Dekorlama_DataTable';
import { toastWarnNotify } from '../helpers/ToastNotify';
import { HiOutlineSearch } from "react-icons/hi";


const Dekorlama = () => {


  const { getMaterialCenter, getDesenCode, getFireData } = useArge()
  const { materialCode, designCode } = useSelector((state) => state.arge)

  let getVardiya = 0;
  const nowData = new Date()
  const currentdatetime = nowData.getDate() + "-" + (nowData.getMonth() + 1) + "-" + nowData.getFullYear()
  const currentTime = nowData.getHours() + ":" + nowData.getMinutes()

  const { currentUser } = useSelector((state) => state.auth)

  const [infoDate, setInfoDate] = useState({
    dateFrom: "",
    dateTo: ""
  })

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
    department: ",Dekorlama",
    type: "Dekorlama",
    urun_kodu: "",
    renk_kodu: "",
    aciklama: "",
    silimsunger: "",
    silimsuyu: "",
    urunsilim: "",
    boya_etiketi: "",
    boya_cokme: "",
    boya_lekesi: "",
    boyaNemDegeri: "",
    boyaCalkalamaSuresi: "",
    boyaCalkalamaHizi: "",
    uygulamaKontrol: "",
    turnetKalıpKontrol: "",
    turnetKalıpHızı: "",
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
      type: "Dekorlama",
      urun_kodu: "",
      aciklama: "",
      silimsunger: "",
      silimsuyu: "",
      urunsilim: "",
      boya_etiketi: "",
      boya_cokme: "",
      boya_lekesi: "",
      boyaNemDegeri: "",
      boyaCalkalamaSuresi: "",
      boyaCalkalamaHizi: "",
      uygulamaKontrol: "",
      turnetKalıpKontrol: "",
      turnetKalıpHızı: "",
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
    getDesenCode()
    getFireData("Dekorlama")

  }, [])

  const handleChangeDate = (e) => {
    const { name, value } = e.target
    setInfoDate({ ...infoDate, [name]: value })
  }

  const handleDateFilter = () => {

    if (infoDate.dateFrom && infoDate.dateTo) {

      //! tarih filtreleme işleminde son seçilen sarih bilgisi localStorage taragında saklanır.
      // localStorage.setItem('lastSelectedDate', JSON.stringify(info))

      getFireData('Dekorlama', infoDate.dateFrom, infoDate.dateTo)

    }
    else {
      toastWarnNotify('Tarih bilgisini kontrol ediniz !')
    }

  }


  return (

    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Dekorlama
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

      <DekorlamaModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} materialCode={materialCode} designCode={designCode}/>

      <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info} />

      <Dekorlama_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info} />

    </div>

  )
}

export default Dekorlama