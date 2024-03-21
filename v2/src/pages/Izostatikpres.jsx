import { Box, Typography } from '@mui/material'
import React from 'react'
import { newBtnStyle, typoStyle } from "../styles/globalStyle"
import IzostatikPresModal from '../components/modals/IzostatikPresModal';
import useArge from '../hooks/useArge';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import DeleteModals from '../components/deleteModals/DeleteModals';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import IzoStatikPres_DataTable from '../components/tables/IzoStatikPres_DataTable';
import { toastErrorNotify, toastInfoNotify, toastWarnNotify } from '../helpers/ToastNotify';



const Izostatikpres = () => {

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
    department:"Sekillendirme",
    type:"IzoStatikPresData",
    is_merkezi: "",
    agirlik: "",
    taban: "",
    kenar: "",
    pkenar: "",
    cap: "",
    izobasinc: "",
    kapamabasinc: "",
    vakumdegeri: "",
    dolumsuresi: "",
    granulturu:"",
    urun_kodu: "",
    catlakkontrol: "",
    rotuskontrol: "",
    yuzeykontrol: "",
    hamurunistif: "",
    uygunsuzluktipi: "",
    aciklama: "",
    vardiyasorumlusu: "",
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
      type:"IzoStatikPresData",
      is_merkezi: "",
      agirlik: "",
      taban: "",
      kenar: "",
      pkenar: "",
      cap: "",
      izobasinc: "",
      kapamabasinc: "",
      vakumdegeri: "",
      dolumsuresi: "",
      granulturu:"",
      urun_kodu: "",
      catlakkontrol: "",
      rotuskontrol: "",
      yuzeykontrol: "",
      hamurunistif: "",
      uygunsuzluktipi: "",
      aciklama: "",
      vardiyasorumlusu: "",
      vardiya: getShift().toString(),
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

    getFireData("IzoStatikPresData")

  }, [])



  return (

    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        İzostatik Pres
      </Typography>

      <Button onClick={handleOpen} variant='outlined' sx={newBtnStyle}>New</Button>

      <IzostatikPresModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} />

      <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info} />

      <IzoStatikPres_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info} />



    </div>

  )
}

export default Izostatikpres