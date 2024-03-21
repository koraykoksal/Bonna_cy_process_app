import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';
import { Container, IconButton, TextField, TextareaAutosize } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { sorunTipi, aksiyonSahibi } from '../../helpers/ProcessData';
import Textarea from '@mui/joy/Textarea';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState, useEffect } from 'react';
import { uygunsuzlukTipi } from "../../helpers/ProcessData"
import { useSelector } from "react-redux"
import useArge from '../../hooks/useArge';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

const AstarlamaModal = ({ open, handleClose, info, setInfo }) => {

  const [search, setSearch] = useState(null)

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const { getFireData, putFireData, postFireData } = useArge()


  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('Astarlama', info)
      getFireData("Astarlama")
    }
    else {
      postFireData("Astarlama", info)
      getFireData("Astarlama")
    }

    handleClose()

  }


  return (
    <div>

      <Modal
        keepMounted
        open={open}
        onClose={() => {
          handleClose()
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>

            <Typography id="keep-mounted-modal-title" variant="h6" component="h2" color="#000000">
              Astarlama
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
            </IconButton>
          </Box>


          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '5500px' }} component='form' onSubmit={handleSubmit}>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>


              <TextField
                fullWidth
                label="Yoğunluk"
                name="yogunluk"
                id="yogunluk"
                type="text"
                variant="outlined"
                value={info.yogunluk}
                onChange={handleChange}
              />


              <TextField
                fullWidth
                label="Nozzle Çapı"
                name="nozzlecap"
                id="nozzlecap"
                type="text"
                variant="outlined"
                value={info.nozzlecap}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Kaset Sıcaklığı"
                name="kasetsicaklik"
                id="kasetsicaklik"
                type="text"
                variant="outlined"
                value={info.kasetsicaklik}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>


              <TextField
                fullWidth
                label="Tank Basınç"
                name="tankbasinc"
                id="tankbasinc"
                type="text"
                variant="outlined"
                value={info.tankbasinc}
                onChange={handleChange}
              />


              <TextField
                fullWidth
                label="Astar Kalinlik"
                name="astarkalinlik"
                id="astarkalinlik"
                type="text"
                variant="outlined"
                value={info.asterkalinlik}
                onChange={handleChange}
              />
            </Box>

            <TextField
              fullWidth
              label="Astarlama Yapan Kişi"
              name="astarlamayapankisi"
              id="astarlamayapankisi"
              type="text"
              variant="outlined"
              value={info.astarlamayapankisi}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel id="redkabul">Red/Kabul/Şartlı Kabul</InputLabel>
              <Select
                labelId="redkabul"
                id="redkabul"
                name='redkabul'
                label="redkabul"
                value={info.redkabul}
                onChange={handleChange}
              >
                <MenuItem value="RED">RED</MenuItem>
                <MenuItem value="KABUL">KABUL</MenuItem>
                <MenuItem value="ŞARTLI KABUL">ŞARTLI KABUL</MenuItem>
              </Select>
            </FormControl>



            <TextField
              multiline
              fullWidth
              label="Açıklama/Aksiyon"
              name="aciklama"
              id="aciklama"
              type="text"
              variant="outlined"
              value={info.aciklama}
              onChange={handleChange}
            />

            <Button
              variant='contained'
              fullWidth
              type='submit'
            >
              {info?.id ? "Update Data" : "Add New Data"}
            </Button>


          </Box>


        </Box>
      </Modal>
    </div>
  );
}

export default AstarlamaModal