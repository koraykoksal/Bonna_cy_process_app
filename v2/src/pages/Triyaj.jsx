import React from 'react'
import { newBtnStyle, typoStyle } from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import BiskuviTriyajModal from '../components/modals/BiskuviTriyajModal';
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteModals from '../components/deleteModals/DeleteModals';
import Triyaj_DataTable from '../components/tables/Triyaj_DataTable';


const Triyaj = () => {


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
    department:"Biskuvi_Triyaj",
    type: "Triyaj",
    urun_kodu: "",
    sekillendirmeYontemi: "",
    toplamAdet: "",
    kontroledilenAdet: "",
    hataliUrunSayisi: "",
    aciklama: "",
    aksiyon: "",
    karantina: "",
    firinkodu: "",
    biskuvifirinSorumlusu: "",
    ayakcatlagi: "",
    kenarCatlagi: "",
    firinKirigi: "",
    diger: "",
    hataliUrunYuzdesi: 0,
    ayakCatlagiYuzdesi: 0,
    kenarCatlagiYuzdesi: 0,
    firinKirigiYuzdesi: 0,
    digerYuzdesi: 0,
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
      type: "Triyaj",
      urun_kodu: "",
      sekillendirmeYontemi: "",
      toplamAdet: "",
      kontroledilenAdet: "",
      hataliUrunSayisi: "",
      aciklama: "",
      aksiyon: "",
      karantina: "",
      firinkodu: "",
      biskuvifirinSorumlusu: "",
      ayakcatlagi: 0,
      kenarCatlagi: 0,
      firinKirigi: 0,
      diger: 0,
      hataliUrunYuzdesi: 0,
      ayakCatlagiYuzdesi: 0,
      kenarCatlagiYuzdesi: 0,
      firinKirigiYuzdesi: 0,
      digerYuzdesi: 0,
      vardiya: getShift().toString(),
      date: currentdatetime.toString(),
      time: currentTime.toString(),
      kontroleden_kisi: currentUser
    })
  }

  const [delOpen, setdelOpen] = React.useState(false);
  const delHandleOpen = () => setdelOpen(true);
  const delHandleClose = () => setdelOpen(false);

  const { getMaterialCenter, getFireData } = useArge()


  useEffect(() => {

    getMaterialCenter()
    getFireData("Triyaj")

  }, [])


  console.log(info)

  return (

    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Biskuvi Triyaj
      </Typography>

      <Button onClick={handleOpen} variant='outlined' sx={newBtnStyle}>New</Button>

      <BiskuviTriyajModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} />

      <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info} />

      <Triyaj_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info} />

    </div>

  )
}

export default Triyaj