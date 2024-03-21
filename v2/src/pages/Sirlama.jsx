import React from 'react'
import { newBtnStyle, typoStyle } from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import SirlamaModal from '../components/modals/SirlamaModal';
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import Sirlama_DataTable from '../components/tables/Sirlama_DataTable';
import DeleteModals from '../components/deleteModals/DeleteModals';

const Sirlama = () => {


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
    department:"Sirlama",
    type: "Sirlama",
    ph:"",
    renkKodu: "",
    urun_kodu: "",
    uretimyeri: "",
    yogunluk: "",
    sirSicaklik: "",
    viskozite: "",
    viskozite_v1: "",
    viskozite_v2: "",
    viskozite_v1v2: "",
    tankKazan_KaristirmaHizi: "",
    balerinTurnetHizi: "",
    balerinGobekHizi: "",
    pompaBasinci: "",
    aktifNozulSayisi_alt: "",
    aktifNozulSayisi_ust: "",
    sirGramaji: "",
    sirKalinligi_taban: "",
    sirKalinligi_kenar: "",
    sirKalinligi_orta: "",
    biskuviKontrol: "",
    biskuviSilimi_silimSuyu: "",
    biskuviSilimi_silimSungeri: "",
    biskuviSilimi_urunSilimi: "",
    makineYikanmasi: "",
    manyetikYikanmasi: "",
    kazandaCokme: "",
    receteKontrolu: "",
    ayakSilimi_silimSungeri: "",
    ayakSilimi_urunAyakSilimi: "",
    sirliUrunYuzeyKontrolu: "",
    auraBoyaLekesiKontrol: "",
    auraBeklemeSuresiKontrol: "",
    uygunsuzlukTipi: "",
    aciklama: "",
    operator: "",
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
      type: "Sirlama",
      renkKodu: "",
      ph:"",
      urun_kodu: "",
      uretimyeri: "",
      yogunluk: "",
      sirSicaklik: "",
      viskozite: "",
      viskozite_v1: "",
      viskozite_v2: "",
      viskozite_v1v2: "",
      tankKazan_KaristirmaHizi: "",
      balerinTurnetHizi: "",
      balerinGobekHizi: "",
      pompaBasinci: "",
      aktifNozulSayisi_alt: "",
      aktifNozulSayisi_ust: "",
      sirGramaji: "",
      sirKalinligi_taban: "",
      sirKalinligi_kenar: "",
      sirKalinligi_orta: "",
      biskuviKontrol: "",
      biskuviSilimi_silimSuyu: "",
      biskuviSilimi_silimSungeri: "",
      biskuviSilimi_urunSilimi: "",
      makineYikanmasi: "",
      manyetikYikanmasi: "",
      kazandaCokme: "",
      receteKontrolu: "",
      ayakSilimi_silimSungeri: "",
      ayakSilimi_urunAyakSilimi: "",
      sirliUrunYuzeyKontrolu: "",
      auraBoyaLekesiKontrol: "",
      auraBeklemeSuresiKontrol: "",
      uygunsuzlukTipi: "",
      aciklama: "",
      operator: "",
      vardiya: getShift().toString(),
      date: currentdatetime.toString(),
      time: currentTime.toString(),
      kontroleden_kisi: currentUser
    })
  }

  const [delOpen, setdelOpen] = React.useState(false);
  const delHandleOpen = () => setdelOpen(true);
  const delHandleClose = () => setdelOpen(false);

  const { getMaterialCenter, getWorkCenter, getDesenCode, getFireData } = useArge()


  useEffect(() => {

    getMaterialCenter()
    getWorkCenter()
    getDesenCode()

    getFireData("Sirlama")

  }, [])


  return (

    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Sırlama
      </Typography>

      <Button variant='outlined' onClick={handleOpen} sx={newBtnStyle}>New</Button>

      <SirlamaModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} />


      <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info}/>

      <Sirlama_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info}/>
    </div>

  )
}

export default Sirlama