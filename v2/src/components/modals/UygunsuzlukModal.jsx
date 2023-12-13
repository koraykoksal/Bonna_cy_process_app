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
import { uygunsuzlukTipi, aksiyonSahibi } from '../../helpers/ProcessData';
import Textarea from '@mui/joy/Textarea';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState, useEffect } from 'react';
import useArge from '../../hooks/useArge';
import { useSelector } from "react-redux"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 525,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

const UygunsuzlukModal = ({ open, handleClose, info, setInfo }) => {


  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const { getFireData, putFireData, postFireData } = useArge()
  const { workCenterCode, materialCode, designCode } = useSelector((state) => state.arge)
  const [desenCodes, setdesenCodes] = useState([])

  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('Uygunsuzluk', info)
      getFireData("Uygunsuzluk")
    }
    else {
      postFireData("Uygunsuzluk", info)
      getFireData("Uygunsuzluk")
    }

    handleClose()

  }

  useEffect(() => {

    const data = designCode.map((item) => item.DESENKODU)
    const dataSort = data.sort()
    setdesenCodes(dataSort)

  }, [designCode])


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
              Uygunsuzluk
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
            </IconButton>
          </Box>


            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '600px' }} component='form' onSubmit={handleSubmit}>


              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

                {/* makine */}
                <FormControl fullWidth>
                  <InputLabel id="is_merkezi">Makine</InputLabel>
                  <Select
                  required
                    labelId="is_merkezi"
                    id="is_merkezi"
                    name='is_merkezi'
                    label="is_merkezi"
                    value={info.is_merkezi}
                    onChange={handleChange}
                  >
                    {
                      workCenterCode?.map(({ ISMERKEZI, index }) => (
                        <MenuItem key={index} value={ISMERKEZI}>{ISMERKEZI}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>

                {/* renk kodu */}
                <FormControl fullWidth>
                  <InputLabel id="renk_kodu">Renk Kodu</InputLabel>
                  <Select
                  required
                    labelId="renk_kodu"
                    id="renk_kodu"
                    name='renk_kodu'
                    label="renk_kodu"
                    value={info.renk_kodu}
                    onChange={handleChange}
                  >
                    {
                      desenCodes?.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>

                {/* ürün kodu */}
                <FormControl fullWidth>
                  <InputLabel id="urun_kodu">Ürün Kodu</InputLabel>
                  <Select
                  required
                    labelId="urun_kodu"
                    id="urun_kodu"
                    name='urun_kodu'
                    label="urun_kodu"
                    value={info.urun_kodu}
                    onChange={handleChange}
                  >
                    {
                      materialCode?.map(({ MALZEMEKODU, index }) => (
                        <MenuItem key={index} value={MALZEMEKODU}>{MALZEMEKODU}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>

              </Box>

              {/* sorun tipi */}
              <FormControl fullWidth>
                <InputLabel id="sorun_tipi">Sorun Tipi</InputLabel>
                <Select
                  required
                  labelId="sorun_tipi"
                  id="sorun_tipi"
                  name='sorun_tipi'
                  label="sorun_tipi"
                  value={info.sorun_tipi}
                  onChange={handleChange}
                >
                  {
                    uygunsuzlukTipi.map((item) => (
                      <MenuItem value={item.text}>{item.text}</MenuItem>
                    ))
                  }

                </Select>
              </FormControl>



              {/* uygunsuz işlem - standart değer */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>

                <TextField
                  fullWidth
                  label="Uygunsuz Deger-İşlem"
                  name="uygunsuz_deger"
                  id="uygunsuz_deger"
                  type="text"
                  variant="outlined"

                  value={info.uygunsuz_deger}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="Standart Değer Aralığı"
                  name="standart_deger"
                  id="standart_deger"
                  type="text"
                  variant="outlined"
                  value={info.standart_deger}
                  onChange={handleChange}
                />

              </Box>



              {/* aksiyon sahibi */}
              <FormControl fullWidth>
                <InputLabel id="aksiyon_sahibi">Aksiyon Sahibi Bölüm</InputLabel>
                <Select
                required
                  labelId="aksiyon_sahibi"
                  id="aksiyon_sahibi"
                  name='aksiyon_sahibi'
                  label="aksiyon_sahibi"
                  value={info.aksiyon_sahibi}
                  onChange={handleChange}
                >
                  {
                    aksiyonSahibi.map((item) => (
                      <MenuItem value={item.text}>{item.text}</MenuItem>
                    ))
                  }

                </Select>
              </FormControl>



              <TextField
                multiline
                fullWidth
                label="Açıklama"
                name="aciklama"
                id="aciklama"
                type="text"
                variant="outlined"
                value={info.aciklama}
                onChange={handleChange}
              />

              <TextField
                multiline
                fullWidth
                label="Aksiyon"
                name="aksiyon"
                id="aksiyon"
                type="text"
                variant="outlined"
                value={info.aksiyon}
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

export default UygunsuzlukModal