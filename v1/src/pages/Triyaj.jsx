import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import BiskuviTriyajModal from '../components/modals/BiskuviTriyajModal';

const Triyaj = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);



  return (
    
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Biskuvi Triyaj
        </Typography>

        <Box>
          <BiskuviTriyajModal open={open} setOpen={setOpen} handleOpen={handleOpen}/>
        </Box>
    </div>

  )
}

export default Triyaj