import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import AstarlamaModal from '../components/modals/AstarlamaModal';


const Astarlama = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
   
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Astarlama
        </Typography>

        <Box>
          <AstarlamaModal open={open} setOpen={setOpen} handleOpen={handleOpen}/>
        </Box>
    </div>

  )
}

export default Astarlama