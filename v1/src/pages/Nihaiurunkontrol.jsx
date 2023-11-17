import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import NihaiUrunKontrolModal from '../components/modals/NihaiUrunKontrolModal';
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import NihaiUrunKontrol_DataTable from '../components/tables/NihaiUrunKontrol_DataTable';
import DeleteModals from '../components/deleteModals/DeleteModals';

const Nihaiurunkontrol = () => {

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
    type: "NihaiUrunKontrol",
    renkKodu: "",
    aciklama: "",
    urun_kodu: "",
    olculenNumuneSayisi: "",
    agirlik: "",
    cap_ab: "",
    cap_cd: "",
    cap_e1e2: "",
    yukseklik_a: "",
    yukseklik_b: "",
    yukseklik_c: "",
    yukseklik_d: "",
    icYukseklik: "",
    dudak_a: "",
    dudak_b: "",
    dudak_c: "",
    dudak_d: "",
    ayakYuksekligi: "",
    bombeCokme: "",
    duzlemdenSapma: "",
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
      type: "NihaiUrunKontrol",
      renkKodu: "",
      aciklama: "",
      urun_kodu: "",
      olculenNumuneSayisi: "",
      agirlik: "",
      cap_ab: "",
      cap_cd: "",
      cap_e1e2: "",
      yukseklik_a: "",
      yukseklik_b: "",
      yukseklik_c: "",
      yukseklik_d: "",
      icYukseklik: "",
      dudak_a: "",
      dudak_b: "",
      dudak_c: "",
      dudak_d: "",
      ayakYuksekligi: "",
      bombeCokme: "",
      duzlemdenSapma: "",
      vardiya: getShift(),
      date: currentdatetime.toString(),
      time: currentTime.toString(),
      kontroleden_kisi: currentUser
    })
  }

  const [delOpen, setdelOpen] = React.useState(false);
  const delHandleOpen = () => setdelOpen(true);
  const delHandleClose = () => setdelOpen(false);

  const { getMaterialCenter, getDesenCode, getFireData } = useArge()


  useEffect(() => {

    getMaterialCenter()
    getDesenCode()

    getFireData("NihaiUrunKontrol")

  }, [])



  return (
    
    <div>
        <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
            Nihai Ürün Kontrol
        </Typography>

        <Button onClick={handleOpen} variant='outlined'>New</Button>

        <NihaiUrunKontrolModal open={open} handleClose={handleClose} info={info} setInfo={setInfo}/>

        <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info}/>

        <NihaiUrunKontrol_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info}/>
    </div>

  )
}

export default Nihaiurunkontrol