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
  width: 525,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

const GranulKontrolModal = ({ open, handleClose, info, setInfo }) => {


  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const { getFireData, putFireData, postFireData } = useArge()
  const { workCenterCode, hammaddeCode } = useSelector((state) => state.arge)


  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('GranulKontrol', info)
      getFireData("GranulKontrol")
    }
    else {
      postFireData("GranulKontrol", info)
      getFireData("GranulKontrol")
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
              Granül Kontrol
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
                    workCenterCode?.filter(data => data.ISMERKEZI.includes('HM-SD')).map(({ ISMERKEZI, index }) => (
                      <MenuItem key={index} value={ISMERKEZI}>{ISMERKEZI}</MenuItem>
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
                      hammaddeCode?.map(({ HAMMADDEKODU, index }) => (
                        <MenuItem key={index} value={HAMMADDEKODU}>{HAMMADDEKODU}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl> */}

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <TextField
                fullWidth
                label="Granül Kodu"
                name="granulkodu"
                id="granulkodu"
                type="text"
                variant="outlined"
                value={info.granulkodu}
                onChange={handleChange}
              />


              <TextField
                fullWidth
                label="Bigbag Kodu"
                name="bigbagkodu"
                id="bigbagkodu"
                type="text"
                variant="outlined"
                value={info.bigbagkodu}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                name="bigbagsaati"
                id="bigbagsaati"
                type="time"
                variant="outlined"
                value={info.bigbagsaati}
                onChange={handleChange}
              />

            </Box>

            <TextField
              fullWidth
              name="bigbagtarih"
              id="bigbagtarih"
              type="date"
              variant="outlined"
              value={info.bigbagtarih}
              onChange={handleChange}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <TextField
                fullWidth
                label="Hammadde Nem Ölçüm"
                name="hammaddenem"
                id="hammaddenem"
                type="text"
                variant="outlined"
                value={info.hammaddenem}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Proses Nem Ölçüm"
                name="prosesnem"
                id="prosesnem"
                type="text"
                variant="outlined"
                value={info.prosesnem}
                onChange={handleChange}
              />
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

export default GranulKontrolModal