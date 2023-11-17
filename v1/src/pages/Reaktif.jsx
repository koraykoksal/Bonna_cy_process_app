import React from 'react'
import { typoStyle } from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import ReaktifModal from '../components/modals/ReaktifModal';
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import DeleteModals from '../components/deleteModals/DeleteModals';
import Reaktif_DataTable from '../components/tables/Reaktif_DataTable';


const Reaktif = () => {

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
    type: "Reaktif",
    urun_kodu: "",
    boyasarjno: "",
    boyayogunluk: "",
    boyamiktari: "",
    aciklama: "",
    redkabul: "",
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
      type: "Reaktif",
      urun_kodu: "",
      boyasarjno: "",
      boyayogunluk: "",
      boyamiktari: "",
      aciklama: "",
      redkabul: "",
      vardiya: getShift(),
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
    getFireData("Reaktif")

  }, [])


  return (

    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Reaktif
      </Typography>

      <Button onClick={handleOpen} variant='outlined'>New</Button>

      <ReaktifModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} />

      <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info}/>

      <Reaktif_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info}/>
      

    </div>

  )
}

export default Reaktif