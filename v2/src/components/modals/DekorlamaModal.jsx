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

const DekorlamaModal = ({ open, handleClose, info, setInfo,materialCode, designCode }) => {

  const [searchUrunKodu, setSearchUrunKodu] = useState(null)
  const [searchRenkKodu, setSearchRenkKodu] = useState(null)

  const [desenCodes, setdesenCodes] = useState([])

  const handleChange = (e,newValue,fieldName) => {
    // setInfo({ ...info, [e.target.name]: e.target.value, ['urun_kodu']: search ? search.MALZEMEKODU : ""  })

      // Autocomplete'ten gelen olaylar için
      if (fieldName) {
        setInfo(prevInfo => ({
          ...prevInfo,
          [fieldName]: newValue?.MALZEMEKODU || newValue || ""
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
      putFireData('Dekorlama', info)
      getFireData("Dekorlama")
    }
    else {
      postFireData("Dekorlama", info)
      getFireData("Dekorlama")
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
              Dekorlama
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
            </IconButton>
          </Box>


          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '550px' }} component='form' onSubmit={handleSubmit}>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <Autocomplete
                fullWidth
                value={searchUrunKodu}
                name='urun_kodu'
                onChange={(event, newValue) => {
                  setSearchUrunKodu(newValue);
                  handleChange(event,newValue,'urun_kodu')
                }}
                id="search-select-demo"
                options={materialCode}
                getOptionLabel={(option) => option.MALZEMEKODU}
                renderInput={(params) => <TextField required {...params} label="Ürün Kodu" />}
              />

              <Autocomplete
                fullWidth
                value={searchRenkKodu}
                name='renk_kodu'
                onChange={(event, newValue) => {
                  setSearchRenkKodu(newValue);
                  handleChange(event,newValue,'renk_kodu')
                }}
                id="search-select-demo"
                options={desenCodes}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField required {...params} label="Renk Kodu" />}
              />

            </Box>




            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <FormControl fullWidth>
                <InputLabel id="silimsunger">Silim Sünger</InputLabel>
                <Select
                  labelId="silimsunger"
                  id="silimsunger"
                  name='silimsunger'
                  label="silimsunger"
                  value={info.silimsunger}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="silimsuyu">Silim Suyu</InputLabel>
                <Select
                  required
                  labelId="silimsuyu"
                  id="silimsuyu"
                  name='silimsuyu'
                  label="silimsuyu"
                  value={info.silimsuyu}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <FormControl fullWidth>
                <InputLabel id="urunsilim">Ürün Silimi</InputLabel>
                <Select
                  required
                  labelId="urunsilim"
                  id="urunsilim"
                  name='urunsilim'
                  label="urunsilim"
                  value={info.urunsilim}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="boya_etiketi">Boya Etiketi</InputLabel>
                <Select
                  required
                  labelId="boya_etiketi"
                  id="boya_etiketi"
                  name='boya_etiketi'
                  label="boya_etiketi"
                  value={info.boya_etiketi}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <FormControl fullWidth>
                <InputLabel id="boya_cokme">Boya Çökme</InputLabel>
                <Select
                  required
                  labelId="boya_cokme"
                  id="boya_cokme"
                  name='boya_cokme'
                  label="boya_cokme"
                  value={info.boya_cokme}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="boya_lekesi">Boya Lekesi</InputLabel>
                <Select
                  required
                  labelId="boya_lekesi"
                  id="boya_lekesi"
                  name='boya_lekesi'
                  label="boya_lekesi"
                  value={info.boya_lekesi}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Nem Değeri"
                name="boyaNemDegeri"
                id="boyaNemDegeri"
                type="text"
                variant="outlined"
                value={info.boyaNemDegeri}
                onChange={handleChange}
              />


              <TextField
                fullWidth
                label="Çalkalama Süresi"
                name="boyaCalkalamaSuresi"
                id="boyaCalkalamaSuresi"
                type="number"
                variant="outlined"
                value={info.boyaCalkalamaSuresi}
                onChange={handleChange}
              />

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Çalkalama Hızı"
                name="boyaCalkalamaHizi"
                id="boyaCalkalamaHizi"
                type="text"
                variant="outlined"
                value={info.boyaCalkalamaHizi}
                onChange={handleChange}
              />

              <FormControl fullWidth>
                <InputLabel id="uygulamaKontrol">Uygulama Kontrol</InputLabel>
                <Select
                  required
                  labelId="uygulamaKontrol"
                  id="uygulamaKontrol"
                  name='uygulamaKontrol'
                  label="uygulamaKontrol"
                  value={info.uygulamaKontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>


              <FormControl fullWidth>
                <InputLabel id="turnetKalıpKontrol">Turnet Kalıp Kontrol</InputLabel>
                <Select
                  required
                  labelId="turnetKalıpKontrol"
                  id="turnetKalıpKontrol"
                  name='turnetKalıpKontrol'
                  label="turnetKalıpKontrol"
                  value={info.turnetKalıpKontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Turnet Kalıp Hızı"
                name="turnetKalıpHızı"
                id="turnetKalıpHızı"
                type="number"
                variant="outlined"
                value={info.turnetKalıpHızı}
                onChange={handleChange}
              />


            </Box>


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



            <Button
              variant='contained'
              fullWidth
              type='submit'
            // onClick={handleSubmit}
            >
              {info?.id ? "Update Data" : "Add New Data"}
            </Button>


          </Box>


        </Box>
      </Modal>
    </div>
  );
}

export default DekorlamaModal