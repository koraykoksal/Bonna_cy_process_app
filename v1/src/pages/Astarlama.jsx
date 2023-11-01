import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import AstarlamaModal from '../components/modals/AstarlamaModal';
import Button from '@mui/material/Button';

const Astarlama = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
   
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Astarlama
        </Typography>

        <Button onClick={handleOpen} variant='outlined'>New</Button>

        <Box>
          <AstarlamaModal open={open} setOpen={setOpen} handleClose={handleClose} handleOpen={handleOpen}/>
        </Box>
    </div>

  )
}

export default Astarlama