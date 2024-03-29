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

const DokumHattiModal = ({ open, handleClose, info, setInfo, workCenterCode, materialCode }) => {

  const [searchUrunKodu, setSearchUrunKodu] = useState(null)
  const [searchMakineKodu, setSearchMakineKodu] = useState(null)
  const [searchSorunTipi, setSearchSorunTipi] = useState(null)

  const handleChange = (e, newValue, fieldName) => {
    // setInfo({ ...info, [e.target.name]: e.target.value, ['urun_kodu']: search ? search.MALZEMEKODU : ""  })

    // Autocomplete'ten gelen olaylar için
    if (fieldName) {
      setInfo(prevInfo => ({
        ...prevInfo,
        [fieldName]: newValue?.MALZEMEKODU || newValue?.ISMERKEZI || newValue?.text ||  ""
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



  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('DokumHatti', info)
      getFireData("DokumHatti")
    }
    else {
      postFireData("DokumHatti", info)
      getFireData("DokumHatti")
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
              Döküm Hattı
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
            </IconButton>
          </Box>


          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '550px' }} component='form' onSubmit={handleSubmit}>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              {/* makine */}
              <Autocomplete
                fullWidth
                value={searchMakineKodu}
                name='is_merkezi'
                onChange={(event, newValue) => {
                  setSearchMakineKodu(newValue);
                  handleChange(event, newValue, 'is_merkezi')
                }}
                id="search-select-demo"
                options={workCenterCode}
                getOptionLabel={(option) => option.ISMERKEZI}
                renderInput={(params) => <TextField {...params} label="İş Merkezi" />}
              />


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
                renderInput={(params) => <TextField {...params} label="Ürün Kodu" />}
              />

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>


              <TextField
                fullWidth
                label="Kurutma Sıcaklığı"
                name="kurutmaSicakligi"
                id="kurutmaSicakligi"
                type="text"
                variant="outlined"
                value={info.kurutmaSicakligi}
                onChange={handleChange}
              />


              <TextField
                fullWidth
                label="Çamur Sıcaklığı"
                name="camurSicakligi"
                id="camurSicakligi"
                type="text"
                variant="outlined"
                value={info.camurSicakligi}
                onChange={handleChange}
              />

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
            </Box>

            <Box>

              <Typography variant='subtitle2' align='center'>
                Tiksotropi
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <TextField
                  fullWidth
                  label="t1"
                  name="t1"
                  id="t1"
                  type="text"
                  variant="outlined"
                  value={info.t1}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="t2"
                  name="t2"
                  id="t2"
                  type="text"
                  variant="outlined"
                  value={info.t2}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="t1-t2"
                  name="t1t2"
                  id="t1t2"
                  type="text"
                  variant="outlined"
                  value={info.t1t2}
                  onChange={handleChange}
                />
              </Box>

            </Box>

            <Box>

              <Typography variant='subtitle2' align='center'>
                Et Kalınlık
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <TextField
                  fullWidth
                  label="3 dk"
                  name="ucDakika"
                  id="ucDakika"
                  type="text"
                  variant="outlined"
                  value={info.ucDakika}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="5 dk"
                  name="besDakika"
                  id="besDakika"
                  type="text"
                  variant="outlined"
                  value={info.besDakika}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="10 dk"
                  name="onDakika"
                  id="onDakika"
                  type="text"
                  variant="outlined"
                  value={info.onDakika}
                  onChange={handleChange}
                />
              </Box>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Ağırlık"
                name="agirlik"
                id="agirlik"
                type="text"
                variant="outlined"
                value={info.agirlik}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Taban"
                name="taban"
                id="taban"
                type="text"
                variant="outlined"
                value={info.taban}
                onChange={handleChange}
              />


              <TextField
                fullWidth
                label="Çap A-B"
                name="ab"
                id="ab"
                type="text"
                variant="outlined"
                value={info.ab}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Çap C-D"
                name="cd"
                id="cd"
                type="text"
                variant="outlined"
                value={info.cd}
                onChange={handleChange}
              />


            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Cidar"
                name="cidarKalinlik"
                id="cidarKalinlik"
                type="text"
                variant="outlined"
                value={info.cidarKalinlik}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Çatlak"
                name="catlak"
                id="catlak"
                type="text"
                variant="outlined"
                value={info.catlak}
                onChange={handleChange}
              />


              <TextField
                fullWidth
                label="Rötuş"
                name="rotus"
                id="rotus"
                type="text"
                variant="outlined"
                value={info.rotus}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Yüzey"
                name="yuzeyKontrol"
                id="yuzeyKontrol"
                type="text"
                variant="outlined"
                value={info.yuzeyKontrol}
                onChange={handleChange}
              />


            </Box>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

            <Autocomplete
                fullWidth
                value={searchSorunTipi}
                name='uygunsuzlukTipi'
                onChange={(event, newValue) => {
                  setSearchSorunTipi(newValue);
                  handleChange(event, newValue, 'uygunsuzlukTipi')
                }}
                id="search-select-demo"
                options={uygunsuzlukTipi}
                getOptionLabel={(option) => option.text}
                renderInput={(params) => <TextField {...params} label="Sorun Tipi"/>}
              />

              {/* <Button variant='contained' size='small' sx={{ textTransform: 'none' }} onClick={() => setInfo(prevInfo => ({ ...prevInfo, uygunsuzlukTipi: '' }))}>Reset</Button> */}

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

            </Box>

            <TextField
              multiline
              fullWidth
              label="Vardiya Sorumlusu / Operatör"
              name="vardiyaSorumlusu"
              id="vardiyaSorumlusu"
              type="text"
              variant="outlined"
              value={info.vardiyaSorumlusu}
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

export default DokumHattiModal