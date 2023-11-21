import React from 'react'
import { typoStyle } from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import DijitalLogoKontrolModal from '../components/modals/DijitalLogoKontrolModal';
import { useSelector } from 'react-redux';
import useArge from '../hooks/useArge';
import { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import DeleteModals from '../components/deleteModals/DeleteModals';
import DijitalLogo_DataTable from '../components/tables/DijitalLogo_DataTable';

const Dijitallogo = () => {

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
    department:",Dijital_Logo",
    type: "DijitalLogo",
    urun_kodu: "",
    kontroledilenAdet: "",
    hataliUrunSayisi: "",
    aciklama: "",
    banthizi: "",
    merkezleme: "",
    besleme: "",
    toplama: "",
    logosonrasi_istif: "",
    hatatanimi: "",
    hataliUrunYuzdesi: 0,
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
      type: "DijitalLogo",
      urun_kodu: "",
      kontroledilenAdet: "",
      hataliUrunSayisi: "",
      aciklama: "",
      banthizi: "",
      merkezleme: "",
      besleme: "",
      toplama: "",
      logosonrasi_istif: "",
      hatatanimi: "",
      hataliUrunYuzdesi: 0,
      vardiya: getShift(),
      date: currentdatetime.toString(),
      time: currentTime.toString(),
      kontroleden_kisi: currentUser
    })
  }

  const [delOpen, setdelOpen] = React.useState(false);
  const delHandleOpen = () => setdelOpen(true);
  const delHandleClose = () => setdelOpen(false);

  const { hammaddeMaterialCode, getFireData } = useArge()


  useEffect(() => {

    hammaddeMaterialCode()

    getFireData("DijitalLogo")

  }, [])


  return (


    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Dijital Logo
      </Typography>

      <Button onClick={handleOpen} variant='outlined'>New</Button>

      <DijitalLogoKontrolModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} />

      <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info} />

      <DijitalLogo_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info} />
    </div>


  )
}

export default Dijitallogo