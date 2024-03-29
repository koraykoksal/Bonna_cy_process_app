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
import Autocomplete from '@mui/material/Autocomplete';


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

const IzostatikPresModal = ({ open, handleClose, info, setInfo, workCenterCode, materialCode }) => {

  const [search, setSearch] = useState(null)
  const [searchSorunTipi, setSearchSorunTipi] = useState(null)

  const handleChange = (e, newValue, fieldName) => {

    // setInfo({ ...info, [e.target.name]: e.target.value ,['urun_kodu']:search ? search.MALZEMEKODU : "" })

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


  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('IzoStatikPresData', info)
      getFireData("IzoStatikPresData")

    }
    else {
      postFireData("IzoStatikPresData", info)
      getFireData("IzoStatikPresData")

    }

    handleClose()

  }


  return (
    <div>

      <Modal
        keepMounted
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>

            <Typography id="keep-mounted-modal-title" variant="h6" component="h2" color="#000000">
              İzostatik Pres
            </Typography>

            <IconButton onClick={handleClose}>
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
                  value={info?.is_merkezi}
                  onChange={handleChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        overflow: 'auto'
                      }
                    }
                  }}
                >
                  {
                    workCenterCode?.filter(data => data?.ISMERKEZI?.includes('SK-KP')).map(({ ISMERKEZI, index }) => (
                      <MenuItem key={index} value={ISMERKEZI}>{ISMERKEZI}</MenuItem>
                    ))
                  }

                </Select>

              </FormControl>

              {/* ürün kodu */}
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
                renderInput={(params) => <TextField required {...params} label="Ürün Kodu" />}
              />

            </Box>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <TextField
                fullWidth
                label="Ağırlık (gr)"
                name="agirlik"
                id="agirlik"
                type="text"
                variant="outlined"

                value={info?.agirlik}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Taban (mm) "
                name="taban"
                id="taban"
                type="text"
                variant="outlined"

                value={info?.taban}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Kenar (mm)"
                name="kenar"
                id="kenar"
                type="text"
                variant="outlined"

                value={info?.kenar}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <TextField
                fullWidth
                label="P.Kenar (mm)"
                name="pkenar"
                id="pkenar"
                type="text"
                variant="outlined"

                value={info?.pkenar}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Çap (mm)"
                name="cap"
                id="cap"
                type="text"
                variant="outlined"

                value={info?.cap}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="İzostatik Basınç (bar)"
                name="izobasinc"
                id="izobasinc"
                type="text"
                variant="outlined"

                value={info?.izobasinc}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <TextField
                fullWidth
                label="Kapama Basınç (bar)"
                name="kapamabasinc"
                id="kapamabasinc"
                type="text"
                variant="outlined"

                value={info?.kapamabasinc}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Vakum Değeri"
                name="vakumdegeri"
                id="vakumdegeri"
                type="text"
                variant="outlined"

                value={info?.vakumdegeri}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Dolum Süresi (sn)"
                name="dolumsuresi"
                id="dolumsuresi"
                type="text"
                variant="outlined"

                value={info?.dolumsuresi}
                onChange={handleChange}
              />
            </Box>



            {/* granül türü */}
            <TextField
              fullWidth
              label="Granül Türü / BigBag Kodu"
              name="granulturu"
              id="granulturu"
              type="text"
              variant="outlined"

              value={info?.granulturu}
              onChange={handleChange}
            />


            {/* uygunsuz işlem - standart değer */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>

              <FormControl fullWidth>
                <InputLabel id="catlakkontrol">ÇK</InputLabel>
                <Select
                  labelId="catlakkontrol"
                  id="catlakkontrol"
                  name='catlakkontrol'
                  label="catlakkontrol"
                  value={info?.catlakkontrol}
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
                  value={info?.rotuskontrol}
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
                  value={info?.yuzeykontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="hamurunistif">HUİ</InputLabel>
                <Select
                  labelId="hamurunistif"
                  id="hamurunistif"
                  name='hamurunistif'
                  label="hamurunistif"
                  value={info?.hamurunistif}
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
                renderInput={(params) => <TextField {...params} label="Sorun Tipi" />}
              />

              {/* RESET BUTTON */}
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
              InputProps={{ inputProps: { min: 0 } }}
              value={info?.aciklama}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Vardiya Sorumlusu veya Operatör"
              name="vardiyasorumlusu"
              id="vardiyasorumlusu"
              type="text"
              variant="outlined"

              value={info?.vardiyasorumlusu}
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

export default IzostatikPresModal