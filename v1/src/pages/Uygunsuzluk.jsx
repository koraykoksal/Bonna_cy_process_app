import Typography from '@mui/material/Typography';
import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import { Box } from '@mui/material';
import UygunsuzlukModal from '../components/modals/UygunsuzlukModal';
import { Formik } from 'formik';
import Button from '@mui/material/Button';

const Uygunsuzluk = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Uygunsuzluk
        </Typography>

        <Button onClick={handleOpen} variant='outlined'>New</Button>

        <Box>
        <UygunsuzlukModal open={open} handleClose={handleClose} setOpen={setOpen} handleOpen={handleOpen}/> 
        </Box>
        
    </div>

    
  )
}

export default Uygunsuzluk