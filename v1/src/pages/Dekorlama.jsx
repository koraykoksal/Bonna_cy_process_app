import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import DekorlamaModal from '../components/modals/DekorlamaModal';
import { useSelector } from 'react-redux';
import useArge from '../hooks/useArge';
import { useEffect } from 'react';


const Dekorlama = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);


  const { getMaterialCenter, getWorkCenter } = useArge()
  const { workCenterCode, materialCode } = useSelector((state) => state.arge)


  //? sayfa ilk yuklendiğinde desen kodlarını erp den çek
  useEffect(() => {

    getMaterialCenter()

  }, [])

  return (
    
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Dekorlama
        </Typography>

        <Box>
          <DekorlamaModal open={open} setOpen={setOpen} handleOpen={handleOpen} materialCode={materialCode}/>
        </Box>
    </div>

  )
}

export default Dekorlama