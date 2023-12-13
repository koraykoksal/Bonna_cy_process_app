import React from 'react'
import { typoStyle } from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import AstarlamaModal from '../components/modals/AstarlamaModal';
import Button from '@mui/material/Button';
import DeleteModals from '../components/deleteModals/DeleteModals';
import Astarlama_DataTable from '../components/tables/Astarlama_DataTable';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import useArge from '../hooks/useArge';

const Astarlama = () => {

  let getVardiya = 0;
  const nowData = new Date()
  const currentdatetime = nowData.getDate() + "-" + (nowData.getMonth() + 1) + "-" + nowData.getFullYear()
  const currentTime = nowData.getHours() + ":" + nowData.getMinutes()

  const { currentUser } = useSelector((state) => state.auth)
  const {getFireData}=useArge()


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
    department:",Hammadde",
    type: "Astarlama",
    is_merkezi: "",
    yogunluk: "",
    nozzlecap: "",
    kasetsicaklik: "",
    tankbasinc: "",
    astarkalinlik: "",
    astarlamayapankisi: "",
    aciklama: "",
    redkabul: "",
    urun_kodu: "",
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
      department:"Hammadde",
      type: "Astarlama",
      yogunluk: "",
      nozzlecap: "",
      kasetsicaklik: "",
      tankbasinc: "",
      astarkalinlik: "",
      astarlamayapankisi: "",
      aciklama: "",
      redkabul: "",
      urun_kodu: "",
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
    getFireData('Astarlama')
  }, [])
  

  return (

    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Astarlama
      </Typography>

      <Button onClick={handleOpen} variant='outlined'>New</Button>

      <AstarlamaModal open={open} handleClose={handleClose} info={info} setInfo={setInfo}/>

      <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info}/>

      <Astarlama_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info}/>

    </div>

  )
}

export default Astarlama