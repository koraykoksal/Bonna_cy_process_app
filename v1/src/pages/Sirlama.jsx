import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import SirlamaModal from '../components/modals/SirlamaModal';
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Button from '@mui/material/Button';

const Sirlama = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { getMaterialCenter, getWorkCenter,getDesenCode } = useArge()
  const { workCenterCode, materialCode, designCode } = useSelector((state) => state.arge)


  //? sayfa ilk yuklendiğinde desen kodlarını erp den çek
  useEffect(() => {

    getMaterialCenter()
    getWorkCenter()
    getDesenCode()
  }, [!workCenterCode, !materialCode, !designCode])


  return (
    
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Sırlama
        </Typography>

        <Button variant='outlined' onClick={handleOpen}>New</Button>

        <Box>
          <SirlamaModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} workCenterCode={workCenterCode} materialCode={materialCode} designCode={designCode}/>
        </Box>
    </div>

  )
}

export default Sirlama