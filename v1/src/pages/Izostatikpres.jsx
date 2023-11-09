import { Box, Typography } from '@mui/material'
import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import IzostatikPresModal from '../components/modals/IzostatikPresModal';
import useArge from '../hooks/useArge';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import EditIcon from "@mui/icons-material/Edit"

const Izostatikpres = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { getMaterialCenter, getWorkCenter,getIzoStatikPresData } = useArge()
  const { workCenterCode, materialCode,izoStatikPresData } = useSelector((state) => state.arge)


  //? sayfa ilk yuklendiğinde desen kodlarını erp den çek
  useEffect(() => {

    getMaterialCenter()
    getWorkCenter()

  }, [!workCenterCode && !materialCode])

  useEffect(() => {
    getIzoStatikPresData()
  }, [])
  
  


  return (

    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            İzostatik Pres
        </Typography>

        <Button onClick={handleOpen} variant='outlined'>New</Button>

      <Box>
        <IzostatikPresModal open={open} handleClose={handleClose} handleOpen={handleOpen} setOpen={setOpen} materialCode={materialCode} workCenterCode={workCenterCode}/>
      </Box>

    </div>

  )
}

export default Izostatikpres