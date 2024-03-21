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

const YuksekBasincModal = ({ open, handleClose, info, setInfo }) => {

  const [search, setSearch] = useState(null)
  const [searchSorunTipi, setSearchSorunTipi] = useState(null)

  
  const handleChange = (e, newValue, fieldName) => {
    // setInfo({ ...info, [e.target.name]: e.target.value,['urun_kodu']:search ? search.MALZEMEKODU : "" })

    // Autocomplete'ten gelen olaylar için
    if (fieldName) {
      setInfo(prevInfo => ({
        ...prevInfo,
        [fieldName]: newValue?.MALZEMEKODU || newValue?.text || ""
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
  const { workCenterCode, materialCode } = useSelector((state) => state.arge)


  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('YuksekBasinc', info)
      getFireData("YuksekBasinc")
    }
    else {
      postFireData("YuksekBasinc", info)
      getFireData("YuksekBasinc")
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
              Yüksek Basınç
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
            </IconButton>
          </Box>


          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '550px' }} component='form' onSubmit={handleSubmit}>


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
                    workCenterCode?.filter((data) => data.ISMERKEZI.includes('SK-B')).map(({ ISMERKEZI, index }) => (
                      <MenuItem key={index} value={ISMERKEZI}>{ISMERKEZI}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              <Autocomplete
                fullWidth
                value={search}
                name='urun_kodu'
                onChange={(event, newValue) => {
                  setSearch(newValue);
                  handleChange(event, newValue, 'urun_kodu')
                }}
                id="search-select-demo"
                options={materialCode}
                getOptionLabel={(option) => option.MALZEMEKODU}
                // style={{ width: 300 }}
                renderInput={(params) => <TextField required {...params} label="Ürün Kodu" />}
              />

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <TextField
                fullWidth
                label="Yoğunluk (g/L)"
                name="yogunluk"
                id="yogunluk"
                type="text"
                variant="outlined"
                value={info.yogunluk}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="V1 (°G)"
                name="v1"
                id="v1"
                type="text"
                variant="outlined"
                value={info.v1}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="V2 (°G)"
                name="v2"
                id="v2"
                type="text"
                variant="outlined"
                value={info.v2}
                onChange={handleChange}
              />

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Çamur (°C)"
                name="camursicakligi"
                id="camursicakligi"
                type="text"
                variant="outlined"
                value={info.camursicakligi}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Ağırlık (g)"
                name="agirlik"
                id="agirlik"
                type="text"
                variant="outlined"
                value={info.agirlik}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Taban (mm)"
                name="taban"
                id="taban"
                type="text"
                variant="outlined"

                value={info.taban}
                onChange={handleChange}
              />

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Kenar (mm)"
                name="kenar"
                id="kenar"
                type="text"
                variant="outlined"

                value={info.kenar}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="P.Kenar (mm)"
                name="pkenar"
                id="pkenar"
                type="text"
                variant="outlined"

                value={info.pkenar}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Basınç"
                name="basinc"
                id="basinc"
                type="text"
                variant="outlined"

                value={info.basinc}
                onChange={handleChange}
              />

            </Box>



            {/* uygunsuz işlem - standart değer */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>

              <FormControl fullWidth>
                <InputLabel id="havakontrol">HK</InputLabel>
                <Select
                  labelId="havakontrol"
                  id="havakontrol"
                  name='havakontrol'
                  label="havakontrol"
                  value={info.havakontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="catlakkontrol">ÇK</InputLabel>
                <Select
                  labelId="catlakkontrol"
                  id="catlakkontrol"
                  name='catlakkontrol'
                  label="catlakkontrol"
                  value={info.catlakkontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="rotuskontrol">RK</InputLabel>
                <Select
                  labelId="rotuskontrol"
                  id="rotuskontrol"
                  name='rotuskontrol'
                  label="rotuskontrol"
                  value={info.rotuskontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="yuzeykontrol">YK</InputLabel>
                <Select
                  labelId="yuzeykontrol"
                  id="yuzeykontrol"
                  name='yuzeykontrol'
                  label="yuzeykontrol"
                  value={info.yuzeykontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                </Select>
              </FormControl>

            </Box>

            {/* aksiyon sahibi */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>

            <Autocomplete
                fullWidth
                value={searchSorunTipi}
                name='uygunsuzluktipi'
                onChange={(event, newValue) => {
                  setSearchSorunTipi(newValue);
                  handleChange(event, newValue, 'uygunsuzluktipi')
                }}
                id="search-select-demo"
                options={uygunsuzlukTipi}
                getOptionLabel={(option) => option.text}
                renderInput={(params) => <TextField required {...params} label="Uygunsuzluk Tipi" />}
              />

              {/* select içinde selçilen değeri resetlemek için kullanılan buton */}
              {/* <Button variant='contained' size='small' sx={{ textTransform: 'none' }} onClick={() => setInfo(prevInfo => ({ ...prevInfo, uygunsuzluktipi: '' }))}>Reset</Button> */}



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

            <TextField
              fullWidth
              label="Vardiya Sorumlusu veya Operatör"
              name="vardiyasorumlusu"
              id="vardiyasorumlusu"
              type="text"
              variant="outlined"

              value={info.vardiyasorumlusu}
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

export default YuksekBasincModal