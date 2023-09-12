import { Box, Typography } from '@mui/material'
import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import IzostatikPresModal from '../components/modals/IzostatikPresModal';


const Izostatikpres = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

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