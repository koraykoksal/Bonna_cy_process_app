import React from 'react'
import { typoStyle } from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import KulpDokumCamurModal from '../components/modals/KulpDokumCamurModal';
import { useSelector } from 'react-redux';
import useArge from '../hooks/useArge';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteModals from '../components/deleteModals/DeleteModals';
import KulpDokum_DataTable from '../components/tables/KulpDokum_DataTable';

const Kulpdokum = () => {


  let getVardiya = 0;
  const nowData = new Date()
  const currentdatetime = nowData.getDate() + "-" + (nowData.getMonth() + 1) + "-" + nowData.getFullYear()
  const currentTime = nowData.getHours() + ":" + nowData.getMinutes()

  const { currentUser } = useSelector((state) => state.auth)

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
    type: "KulpDokum",
    is_merkezi: "",
    agirlik: "",
    taban: "",
    kenar: "",
    pkenar: "",
    yogunluk: "",
    t1: "",
    t2: "",
    t1t2: "",
    tankkaristirmahizi: "",
    istifsayisi: "",
    redkabul: "",
    kulpuyumu: "",
    uygunsuzluktipi: "",
    aciklama: "",
    vardiyasorumlusu: "",
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
      type: "KulpDokum",
      is_merkezi: "",
      agirlik: "",
      taban: "",
      kenar: "",
      pkenar: "",
      yogunluk: "",
      t1: "",
      t2: "",
      t1t2: "",
      tankkaristirmahizi: "",
      istifsayisi: "",
      redkabul: "",
      kulpuyumu: "",
      uygunsuzluktipi: "",
      aciklama: "",
      vardiyasorumlusu: "",
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

  const { getMaterialCenter, getWorkCenter, getFireData } = useArge()


  useEffect(() => {

    getMaterialCenter()
    getWorkCenter()

    getFireData("KulpDokum")

  }, [])


  return (

    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Kulp Döküm
      </Typography>

      <Button onClick={handleOpen} variant='outlined'>New</Button>

      <KulpDokumCamurModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} />

      <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info} />

      <KulpDokum_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info} />
    </div>

  )
}

export default Kulpdokum