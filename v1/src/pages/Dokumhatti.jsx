import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import DokumHattiModal from '../components/modals/DokumHattiModal';
import { useSelector } from 'react-redux';
import useArge from '../hooks/useArge';
import { useEffect } from 'react';


const Dokumhatti = () => {

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
            Döküm Hattı
        </Typography>

        <Box>
          <DokumHattiModal open={open} setOpen={setOpen} handleOpen={handleOpen} workCenterCode={workCenterCode} materialCode={materialCode}/>
        </Box>
    </div>

  )
}

export default Dokumhatti