import { Box, Typography } from '@mui/material'
import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import IzostatikPresModal from '../components/modals/IzostatikPresModal';
import useArge from '../hooks/useArge';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Izostatikpres = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);


  const { getMaterialCenter, getWorkCenter } = useArge()
  const { workCenterCode, materialCode } = useSelector((state) => state.arge)


  //? sayfa ilk yuklendiğinde desen kodlarını erp den çek
  useEffect(() => {

    getMaterialCenter()
    getWorkCenter()

  }, [])

  

  return (

    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            İzostatik Pres
        </Typography>

      <Box>
        <IzostatikPresModal open={open} handleOpen={handleOpen} setOpen={setOpen} workCenterCode={workCenterCode} materialCode={materialCode}/>
      </Box>

    </div>

  )
}

export default Izostatikpres