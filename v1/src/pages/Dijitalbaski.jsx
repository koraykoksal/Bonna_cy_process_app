import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import DijitalBaskiModal from '../components/modals/DijitalBaskiModal';
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Button from '@mui/material/Button';


const Dijitalbaski = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { getMaterialCenter,getDesenCode } = useArge()
  const {materialCode, designCode } = useSelector((state) => state.arge)


  //? sayfa ilk yuklendiğinde desen kodlarını erp den çek
  useEffect(() => {

    getMaterialCenter()
    getDesenCode()
  }, [!materialCode && !designCode ])

  return (
    
    <div>
        <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
            Dijital Baskı
        </Typography>

        <Button onClick={handleOpen} variant='outlined'>New</Button>

        <Box>
          <DijitalBaskiModal open={open} handleClose={handleClose} setOpen={setOpen} handleOpen={handleOpen} materialCode={materialCode} designCode={designCode}/>
        </Box>
    </div>


  )
}

export default Dijitalbaski