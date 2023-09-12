import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import ManDikTornaPresModal from '../components/modals/ManDikTornaPresModal';



const Mandiktornapres = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);


  return (
    
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Manuel Torna - Dik Torna - Dik Pres
        </Typography>

        <Box>
          <ManDikTornaPresModal open={open} setOpen={setOpen} handleOpen={handleOpen}/>
        </Box>
    </div>

  )
}

export default Mandiktornapres