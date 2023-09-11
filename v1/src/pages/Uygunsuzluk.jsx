import Typography from '@mui/material/Typography';
import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import { Box, Button } from '@mui/material';
import UygunsuzlukModal from '../components/modals/UygunsuzlukModal';


const Uygunsuzluk = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);


  return (
    
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Uygunsuzluk
        </Typography>

        <Box sx={{overflow:'scroll'}}>
        <UygunsuzlukModal open={open} setOpen={setOpen} handleOpen={handleOpen}/>
        </Box>
        
    </div>

    
  )
}

export default Uygunsuzluk