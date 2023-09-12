import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import OtomatikTornaModal from '../components/modals/OtomatikTornaModal copy';



const Otomatiktorna = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    

    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Otomaik Torna
        </Typography>

        <Box>
          <OtomatikTornaModal open={open} setOpen={setOpen} handleOpen={handleOpen}/>
        </Box>
    </div>



  )
}

export default Otomatiktorna