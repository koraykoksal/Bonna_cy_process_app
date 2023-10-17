import { Box, Typography } from '@mui/material'
import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import IzostatikPresModal from '../components/modals/IzostatikPresModal';
import useArge from '../hooks/useArge';
import { useEffect } from 'react';

const Izostatikpres = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const {getDesenCode,getWorkCenter} = useArge()

  useEffect(() => {
    getWorkCenter()
  }, [])
  

  return (

    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            İzostatik Pres
        </Typography>

      <Box>
        <IzostatikPresModal open={open} handleOpen={handleOpen} setOpen={setOpen}/>
      </Box>

    </div>

  )
}

export default Izostatikpres