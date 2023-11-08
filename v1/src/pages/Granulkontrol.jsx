import React from 'react'
import {typoStyle} from "../styles/globalStyle"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import GranulKontrolModal from '../components/modals/GranulKontrolModal';
import { useSelector } from 'react-redux';
import useArge from '../hooks/useArge';
import { useEffect } from 'react';
import Button from '@mui/material/Button';

const Granulkontrol = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { getWorkCenter,hammaddeMaterialCode } = useArge()
  const { workCenterCode, hammaddeCode } = useSelector((state) => state.arge)


  //? sayfa ilk yuklendiğinde desen kodlarını erp den çek
  useEffect(() => {

    hammaddeMaterialCode()
    getWorkCenter()

  }, [!workCenterCode, !hammaddeCode])


  return (
    
    <div>
        <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
            Granül Kontrol
        </Typography>

        <Button onClick={handleOpen} variant='outlined'>New</Button>

        <Box>
          <GranulKontrolModal open={open} handleClose={handleClose} setOpen={setOpen} handleOpen={handleOpen} workCenterCode={workCenterCode} hammaddeCode={hammaddeCode}/>
        </Box>
    </div>

  )
}

export default Granulkontrol