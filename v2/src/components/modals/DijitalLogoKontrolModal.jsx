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

const DijitalLogoKontrolModal = ({ open, handleClose, info, setInfo }) => {


  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const { getFireData, putFireData, postFireData } = useArge()
  const { materialCode } = useSelector((state) => state.arge)


  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('DijitalLogo', info)
      getFireData("DijitalLogo")
    }
    else {
      postFireData("DijitalLogo", info)
      getFireData("DijitalLogo")
    }

    handleClose()

  }

  const control = () => {
    setInfo(

      {
        ...info,
        hataliUrunYuzdesi: (Number(info.hataliUrunSayisi) / Number(info.kontroledilenAdet)).toFixed(1),
      }


    )
  }

  useEffect(() => {

    control()

  }, [
    info.hataliUrunSayisi,
    info.kontroledilenAdet
  ])




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
              Dijital Logo Kontrol
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
            </IconButton>
          </Box>


          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '550px' }} component='form' onSubmit={handleSubmit}>


            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>

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
                required
                fullWidth
                label="Toplam Adet"
                name="toplamAdet"
                id="toplamAdet"
                type="text"
                variant="outlined"
                value={info.toplamAdet}
                onChange={handleChange}
              />


              <TextField
                required
                fullWidth
                label="Kontrol Edilen"
                name="kontroledilenAdet"
                id="kontroledilenAdet"
                type="text"
                variant="outlined"
                value={info.kontroledilenAdet}
                onChange={handleChange}
              />

              <TextField
                required
                fullWidth
                label="Hatalı Urun"
                name="hataliUrunSayisi"
                id="hataliUrunSayisi"
                type="text"
                variant="outlined"
                value={info.hataliUrunSayisi}
                onChange={handleChange}
              />

            </Box>

            <TextField
              disabled
              fullWidth
              label="Hatalı Ürün Yüzdesi"
              name="hataliUrunYuzdesi"
              id="hataliUrunYuzdesi"
              type="text"
              variant="outlined"
              value={info.hataliUrunYuzdesi}
              onChange={handleChange}
            />



            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <FormControl fullWidth>
                <InputLabel id="banthizi">Bant Hızı</InputLabel>
                <Select
                  labelId="banthizi"
                  id="banthizi"
                  name='banthizi'
                  label="banthizi"
                  value={info.banthizi}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="merkezleme">Merkezleme</InputLabel>
                <Select
                  labelId="merkezleme"
                  id="merkezleme"
                  name='merkezleme'
                  label="merkezleme"
                  value={info.merkezleme}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <FormControl fullWidth>
                <InputLabel id="besleme">Besleme</InputLabel>
                <Select
                  labelId="besleme"
                  id="besleme"
                  name='besleme'
                  label="besleme"
                  value={info.besleme}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="toplama">Toplama</InputLabel>
                <Select
                  labelId="toplama"
                  id="toplama"
                  name='toplama'
                  label="toplama"
                  value={info.toplama}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="logosonrasi_istif">İstif</InputLabel>
                <Select
                  labelId="logosonrasi_istif"
                  id="logosonrasi_istif"
                  name='logosonrasi_istif'
                  label="logosonrasi_istif"
                  value={info.logosonrasi_istif}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

            </Box>



            <TextField
              fullWidth
              label="Hata Tanımı"
              name="hatatanimi"
              id="hatatanimi"
              type="text"
              variant="outlined"
              value={info.hatatanimi}
              onChange={handleChange}
            />

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

export default DijitalLogoKontrolModal