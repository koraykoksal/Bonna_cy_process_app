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

const KulpDokumCamurModal = ({ open, handleClose, info, setInfo }) => {



  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const { getFireData, putFireData, postFireData } = useArge()
  const { workCenterCode, materialCode } = useSelector((state) => state.arge)


  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('KulpDokum', info)
      getFireData("KulpDokum")
    }
    else {
      postFireData("KulpDokum", info)
      getFireData("KulpDokum")
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
              Kulp Döküm Çamuru
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
                    workCenterCode?.filter(data => data.ISMERKEZI.includes('SK-KD')).map(({ ISMERKEZI, index }) => (
                      <MenuItem key={index} value={ISMERKEZI}>{ISMERKEZI}</MenuItem>
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
                label="Kurutma Sıcaklığı"
                name="kurutmaSicaklik"
                id="kurutmaSicaklik"
                type="number"
                variant="outlined"
                value={info.kurutmaSicaklik}
                onChange={handleChange}
              />

            </Box>


            <Box>

              <Typography variant='subtitle1' align='center'>
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

            <TextField
              fullWidth
              label="Tank Karıştırma Hızı"
              name="tankkaristirmahizi"
              id="tankkaristirmahizi"
              type="text"
              variant="outlined"
              value={info.tankkaristirmahizi}
              onChange={handleChange}
            />


            {/* uygunsuz işlem - standart değer */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>



              <FormControl fullWidth>
                <InputLabel id="istifsayisi">İstaf Sayısı</InputLabel>
                <Select
                  labelId="istifsayisi"
                  id="istifsayisi"
                  name='istifsayisi'
                  label="istifsayisi"
                  value={info.istifsayisi}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="kulpuyumu">Kulp Uyumu</InputLabel>
                <Select
                  labelId="kulpuyumu"
                  id="kulpuyumu"
                  name='kulpuyumu'
                  label="kulpuyumu"
                  value={info.kulpuyumu}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <FormControl fullWidth>
                <InputLabel id="uygunsuzluktipi">Uygunsuzluk Tipi</InputLabel>
                <Select
                  labelId="uygunsuzluktipi"
                  id="uygunsuzluktipi"
                  name='uygunsuzluktipi'
                  label="uygunsuzluktipi"
                  value={info.uygunsuzluktipi}
                  onChange={handleChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300, // Bu değeri istediğiniz maksimum yüksekliğe göre ayarlayabilirsiniz
                        overflow: 'auto',
                      },
                    },
                  }}
                >
                  {
                    uygunsuzlukTipi.map((item) => (
                      <MenuItem value={item.text}>{item.text}</MenuItem>
                    ))
                  }

                </Select>
              </FormControl>

              <Button variant='contained' size='small' sx={{ textTransform: 'none' }} onClick={() => setInfo(prevInfo => ({ ...prevInfo, uygunsuzluktipi: '' }))}>Reset</Button>



            </Box>

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

export default KulpDokumCamurModal