import React from 'react'
import { newBtnStyle, typoStyle } from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import AyakTaslamaModal from '../components/modals/AyakTaslamaModal';
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteModals from '../components/deleteModals/DeleteModals';
import Ayaktaslama_DataTable from '../components/tables/Ayaktaslama_DataTable';

const Ayaktaslama = () => {

  const { getMaterialCenter, getDesenCode, getFireData } = useArge()
  const { materialCode, designCode } = useSelector((state) => state.arge)

  let getVardiya = 0;
  const nowData = new Date()
  const currentdatetime = nowData.getDate() + "-" + (nowData.getMonth() + 1) + "-" + nowData.getFullYear()
  const currentTime = nowData.getHours() + ":" + nowData.getMinutes()

  const { currentUser } = useSelector((state) => state.auth)

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
    department:",Kalite_Ayrım",
    type: "AyakTaslama",
    urun_kodu: "",
    renkkodu: "",
    kontrolAdet: "",
    uygunsuzAdet: "",
    uygunsuzlukOrani: 0,
    makineParametreKontrolu: "",
    aciklama: "",
    vardiya: getShift().toString(),
    date: currentdatetime.toString(),
    time: currentTime.toString(),
    kontroleden_kisi: currentUser
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setInfo({
      type: "AyakTaslama",
      urun_kodu: "",
      renkkodu: "",
      kontrolAdet: "",
      uygunsuzAdet: "",
      uygunsuzlukOrani: 0,
      makineParametreKontrolu: "",
      aciklama: "",
      vardiya: getShift().toString(),
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

    getFireData("AyakTaslama")

  }, [])



  return (

    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Ayak Taşlama
      </Typography>

      <Button onClick={handleOpen} variant='outlined' sx={newBtnStyle}>New</Button>

      <AyakTaslamaModal  open={open} handleClose={handleClose} info={info} setInfo={setInfo} materialCode={materialCode} designCode={designCode} />

      <DeleteModals  delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info}/>

      <Ayaktaslama_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info}/>

    </div>

  )
}

export default Ayaktaslama