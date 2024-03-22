import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';
import { Autocomplete, Container, IconButton, TextField, TextareaAutosize } from '@mui/material';
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
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

const UygunsuzlukModal = ({ open, handleClose, info, setInfo,workCenterCode, materialCode, designCode }) => {


  const [searchUrunKodu, setSearchUrunKodu] = useState(null)
  const [searchRenkKodu, setSearchRenkKodu] = useState(null)
  const [searchMakineKodu, setSearchMakineKodu] = useState(null)
  const [searchSorunTipi, setSearchSorunTipi] = useState(null)

  const handleChange = (e, newValue, fieldName) => {

    // Autocomplete'ten gelen olaylar için
    if (fieldName) {
      setInfo(prevInfo => ({
        ...prevInfo,
        [fieldName]: newValue?.ISMERKEZI || newValue?.MALZEMEKODU || newValue?.text || newValue || ""
      }));
    }
    // TextField'tan gelen olaylar için
    else if (e?.target) {
      const { name, value } = e.target;
      setInfo(prevInfo => ({
        ...prevInfo,
        [name]: value
      }));
    }


  }

  const { getFireData, putFireData, postFireData } = useArge()
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

              <Autocomplete
                fullWidth
                value={searchMakineKodu}
                name='is_merkezi'
                onChange={(event, newValue) => {
                  setSearchMakineKodu(newValue)
                  handleChange(event, newValue, 'is_merkezi')
                }}
                id="search-select-demo"
                options={workCenterCode}
                getOptionLabel={(option) => option.ISMERKEZI}
                renderInput={(params) => <TextField required {...params} label="İş Merkezi" />}
              />


              {/* RENK KODU */}
              <Autocomplete
                fullWidth
                value={searchRenkKodu}
                name='renk_kodu'
                onChange={(event, newValue) => {
                  setSearchRenkKodu(newValue)
                  handleChange(event, newValue, 'renk_kodu')
                }}
                id="search-select-demo"
                options={desenCodes}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField required {...params} label="Renk Kodu" />}
              />

              {/* ÜRÜN KODU */}
              <Autocomplete
                fullWidth
                value={searchUrunKodu}
                name='urun_kodu'
                onChange={(event, newValue) => {
                  setSearchUrunKodu(newValue);
                  handleChange(event, newValue, 'urun_kodu')
                }}
                id="search-select-demo"
                options={materialCode}
                getOptionLabel={(option) => option.MALZEMEKODU}
                renderInput={(params) => <TextField required {...params} label="Ürün Kodu" />}
              />

            </Box>


            {/* sorun tipi */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>

              <Autocomplete
                fullWidth
                value={searchSorunTipi}
                name='sorun_tipi'
                onChange={(event, newValue) => {
                  setSearchSorunTipi(newValue);
                  handleChange(event, newValue, 'sorun_tipi')
                }}
                id="search-select-demo"
                options={uygunsuzlukTipi}
                getOptionLabel={(option) => option.text}
                renderInput={(params) => <TextField required {...params} label="Sorun Tipi" />}
              />


              {/* RESET BUTTON */}
              {/* select içinde selçilen değeri resetlemek için kullanılan buton */}
              {/* <Button variant='contained' size='small' sx={{ textTransform: 'none' }} onClick={() => setInfo(prevInfo => ({ ...prevInfo, ['sorun_tipi']: '' }))}>Reset</Button> */}

            </Box>


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