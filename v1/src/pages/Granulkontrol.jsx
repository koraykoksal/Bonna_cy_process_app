import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import GranulKontrolModal from '../components/modals/GranulKontrolModal';



const Granulkontrol = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);


  return (
    
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Granül Kontrol
        </Typography>

        <Box>
          <GranulKontrolModal open={open} setOpen={setOpen} handleOpen={handleOpen}/>
        </Box>
    </div>

  )
}

export default Granulkontrol