import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import KulpDokumCamurModal from '../components/modals/KulpDokumCamurModal';
import { useSelector } from 'react-redux';
import useArge from '../hooks/useArge';
import { useEffect } from 'react';


const Kulpdokum = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const { getMaterialCenter, getWorkCenter } = useArge()
  const { workCenterCode, materialCode } = useSelector((state) => state.arge)


  //? sayfa ilk yuklendiğinde desen kodlarını erp den çek
  useEffect(() => {

    getMaterialCenter()
    getWorkCenter()

  }, [])


  return (
    
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Kulp Döküm
        </Typography>

        <Box>
          <KulpDokumCamurModal open={open} setOpen={setOpen} handleOpen={handleOpen} materialCode={materialCode} workCenterCode={workCenterCode}/>
        </Box>
    </div>

  )
}

export default Kulpdokum