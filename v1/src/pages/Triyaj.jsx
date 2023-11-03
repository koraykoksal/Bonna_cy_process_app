import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import BiskuviTriyajModal from '../components/modals/BiskuviTriyajModal';
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Button from '@mui/material/Button';


const Triyaj = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { getMaterialCenter } = useArge()
  const { materialCode } = useSelector((state) => state.arge)


  //? sayfa ilk yuklendiğinde desen kodlarını erp den çek
  useEffect(() => {

    getMaterialCenter()

  }, [!materialCode])


  return (
    
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Biskuvi Triyaj
        </Typography>

        <Button onClick={handleOpen} variant='outlined'>New</Button>

        <Box>
          <BiskuviTriyajModal open={open} handleClose={handleClose} setOpen={setOpen} handleOpen={handleOpen} materialCode={materialCode}/>
        </Box>
    </div>

  )
}

export default Triyaj