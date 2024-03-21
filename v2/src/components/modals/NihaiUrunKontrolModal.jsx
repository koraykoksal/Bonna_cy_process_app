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

const NihaiUrunKontrolModal = ({ open, handleClose, info, setInfo }) => {

  const [search, setSearch] = useState(null)

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value, ['urun_kodu']: search.MALZEMEKODU })
  }

  const { getFireData, putFireData, postFireData } = useArge()
  const { materialCode, designCode } = useSelector((state) => state.arge)
  const [desenCodes, setdesenCodes] = useState([])


  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('NihaiUrunKontrol', info)
      getFireData("NihaiUrunKontrol")
    }
    else {
      postFireData("NihaiUrunKontrol", info)
      getFireData("NihaNihaiUrunKontroliUrun")
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
              Nihai Ürün Kontrol
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
            </IconButton>
          </Box>


          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '550px' }} component='form' onSubmit={handleSubmit}>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              {/* makine */}
              <FormControl fullWidth>
                <InputLabel id="renkKodu">Renk Kodu</InputLabel>
                <Select
                  required
                  labelId="renkKodu"
                  id="renkKodu"
                  name='renkKodu'
                  label="renkKodu"
                  value={info.renkKodu}
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
              {/* <FormControl fullWidth>
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
              </FormControl> */}

              <Autocomplete
                fullWidth
                value={search}
                onChange={(event, newValue) => {
                  setSearch(newValue);
                }}
                id="search-select-demo"
                options={materialCode}
                getOptionLabel={(option) => option.MALZEMEKODU}
                // style={{ width: 500 }}
                renderInput={(params) => <TextField {...params} label="Ürün Kodu" />}
              />


            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>


              <TextField
                fullWidth
                label="Ölçülen Numune Sayısı"
                name="olculenNumuneSayisi"
                id="olculenNumuneSayisi"
                type="text"
                variant="outlined"
                value={info.olculenNumuneSayisi}
                onChange={handleChange}
              />


              <TextField
                fullWidth
                label="Ağırlık (gr)"
                name="agirlik"
                id="agirlik"
                type="text"
                variant="outlined"
                value={info.agirlik}
                onChange={handleChange}
              />
            </Box>

            <Box>

              <Typography variant='subtitle2' align='center'>
                Çap (gr)
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <TextField
                  fullWidth
                  label="A-B Uzun Kenar"
                  name="cap_ab"
                  id="cap_ab"
                  type="text"
                  variant="outlined"
                  value={info.cap_ab}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="C-D"
                  name="cap_cd"
                  id="cap_cd"
                  type="text"
                  variant="outlined"
                  value={info.cap_cd}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="E1-E2"
                  name="cap_e1e2"
                  id="cap_e1e2"
                  type="text"
                  variant="outlined"
                  value={info.cap_e1e2}
                  onChange={handleChange}
                />
              </Box>

            </Box>

            <Box>

              <Typography variant='subtitle2' align='center'>
                Yükseklik (mm)
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <TextField
                  fullWidth
                  label="A"
                  name="yukseklik_a"
                  id="yukseklik_a"
                  type="text"
                  variant="outlined"
                  value={info.yukseklik_a}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="B"
                  name="yukseklik_b"
                  id="yukseklik_b"
                  type="text"
                  variant="outlined"
                  value={info.yukseklik_b}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="C"
                  name="yukseklik_c"
                  id="yukseklik_c"
                  type="text"
                  variant="outlined"
                  value={info.yukseklik_c}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="D"
                  name="yukseklik_d"
                  id="yukseklik_d"
                  type="text"
                  variant="outlined"
                  value={info.yukseklik_d}
                  onChange={handleChange}
                />
              </Box>

            </Box>

            <TextField
              fullWidth
              label="İç Yükseklik (mm)"
              name="icYukseklik"
              id="icYukseklik"
              type="text"
              variant="outlined"
              value={info.icYukseklik}
              onChange={handleChange}
            />

            <Box>

              <Typography variant='subtitle2' align='center'>
                Dudak (mm)
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <TextField
                  fullWidth
                  label="A"
                  name="dudak_a"
                  id="dudak_a"
                  type="text"
                  variant="outlined"
                  value={info.dudak_a}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="B"
                  name="dudak_b"
                  id="dudak_b"
                  type="text"
                  variant="outlined"
                  value={info.dudak_b}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="C"
                  name="dudak_c"
                  id="dudak_c"
                  type="text"
                  variant="outlined"
                  value={info.dudak_c}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="D"
                  name="dudak_d"
                  id="dudak_d"
                  type="text"
                  variant="outlined"
                  value={info.dudak_d}
                  onChange={handleChange}
                />
              </Box>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Ayak Yüksekliği"
                name="ayakYuksekligi"
                id="ayakYuksekligi"
                type="text"
                variant="outlined"
                value={info.ayakYuksekligi}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Bombe Çökme"
                name="bombeCokme"
                id="bombeCokme"
                type="text"
                variant="outlined"
                value={info.bombeCokme}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Düzlemden Sapma"
                name="duzlemdenSapma"
                id="duzlemdenSapma"
                type="text"
                variant="outlined"
                value={info.duzlemdenSapma}
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
            >
              {info?.id ? "Update Data" : "Add New Data"}
            </Button>


          </Box>


        </Box>
      </Modal>
    </div>
  );
}

export default NihaiUrunKontrolModal