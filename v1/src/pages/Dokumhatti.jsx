import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import DokumHattiModal from '../components/modals/DokumHattiModal';
import { useSelector } from 'react-redux';
import useArge from '../hooks/useArge';
import { useEffect } from 'react';
import Button from '@mui/material/Button';


const Dokumhatti = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { getMaterialCenter, getWorkCenter } = useArge()
  const { workCenterCode, materialCode } = useSelector((state) => state.arge)


  //? sayfa ilk yuklendiğinde desen kodlarını erp den çek
  useEffect(() => {

    getMaterialCenter()
    getWorkCenter()

  }, [!workCenterCode && !workCenterCode])


  return (
    
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Döküm Hattı
        </Typography>

        <Button onClick={handleOpen} variant='outlined'>New</Button>

        <Box>
          <DokumHattiModal open={open} handleClose={handleClose} setOpen={setOpen} handleOpen={handleOpen} workCenterCode={workCenterCode} materialCode={materialCode}/>
        </Box>
    </div>

  )
}

export default Dokumhatti