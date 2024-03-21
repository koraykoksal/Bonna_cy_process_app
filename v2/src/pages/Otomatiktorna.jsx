import React from 'react'
import { newBtnStyle, typoStyle } from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import OtomatikTornaModal from '../components/modals/OtomatikTornaModal';
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteModals from '../components/deleteModals/DeleteModals';
import OtomatikTorna_DataTable from '../components/tables/OtomatikTorna_DataTable';

const Otomatiktorna = () => {


  let getVardiya = 0;
  const nowData = new Date()
  const currentdatetime = nowData.getDate() + "-" + (nowData.getMonth() + 1) + "-" + nowData.getFullYear()
  const currentTime = nowData.getHours() + ":" + nowData.getMinutes()
  const { getMaterialCenter, getWorkCenter, getFireData } = useArge()
  const { workCenterCode, materialCode } = useSelector((state) => state.arge)

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
    department:"Sekillendirme",
    type:"OtomatikTorna",
    is_merkezi: "",
    agirlik: "",
    taban: "",
    kenar: "",
    pkenar: "",
    cap: "",
    aynacap: "",
    kulpbunye: "",
    kesilensucuk: "",
    kirpintimiktar: "",
    camursert: "",
    catlakkontrol: "",
    rotuskontrol: "",
    yuzeykontrol: "",
    uygunsuzluktipi: "",
    aciklama: "",
    vardiyasorumlusu: "",
    kelepenozulkontrol: "",
    havakontrol: "",
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
      type:"OtomatikTorna",
      is_merkezi: "",
      agirlik: "",
      taban: "",
      kenar: "",
      pkenar: "",
      cap: "",
      aynacap: "",
      kulpbunye: "",
      kesilensucuk: "",
      kirpintimiktar: "",
      camursert: "",
      catlakkontrol: "",
      rotuskontrol: "",
      yuzeykontrol: "",
      uygunsuzluktipi: "",
      aciklama: "",
      vardiyasorumlusu: "",
      kelepenozulkontrol: "",
      havakontrol: "",
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

    getMaterialCenter()
    getWorkCenter()

    getFireData("OtomatikTorna")

  }, [])



  return (


    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Otomaik Torna
      </Typography>

      <Button onClick={handleOpen} variant='outlined' sx={newBtnStyle}>New</Button>

      <OtomatikTornaModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} workCenterCode={workCenterCode} materialCode={materialCode}/>

      <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info} />

      <OtomatikTorna_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info} />

    </div>



  )
}

export default Otomatiktorna