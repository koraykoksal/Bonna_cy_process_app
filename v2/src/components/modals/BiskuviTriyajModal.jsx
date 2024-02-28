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

const BiskuviTriyajModal = ({ open, handleClose, info, setInfo }) => {

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })

  }


  const { getFireData, putFireData, postFireData } = useArge()
  const { materialCode } = useSelector((state) => state.arge)


  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('Triyaj', info)
      getFireData("Triyaj")
    }
    else {
      postFireData("Triyaj", info)
      getFireData("Triyaj")
    }

    handleClose()

  }



  const control = () => {

    setInfo(

      {
        ...info,
        hataliUrunYuzdesi: (Number(info.hataliUrunSayisi) / Number(info.kontroledilenAdet)).toFixed(1),
        ayakCatlagiYuzdesi: (Number(info.ayakcatlagi) / Number(info.kontroledilenAdet)).toFixed(1),
        kenarCatlagiYuzdesi: (Number(info.kenarCatlagi) / Number(info.kontroledilenAdet)).toFixed(1),

        firinKirigiYuzdesi: (Number(info.firinKirigi) / Number(info.kontroledilenAdet)).toFixed(1),
        digerYuzdesi: (Number(info.diger) / Number(info.kontroledilenAdet)).toFixed(1),

      }


    )
  }


  useEffect(() => {

    control()

  }, [info.hataliUrunSayisi, info.ayakcatlagi, info.kenarCatlagi, info.firinKirigi, info.diger])


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
              Biskuvi Triyaj
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

              <FormControl fullWidth>
                <InputLabel id="sekillendirmeYontemi">Şekillendirme Yöntemi</InputLabel>
                <Select
                  required
                  labelId="sekillendirmeYontemi"
                  id="sekillendirmeYontemi"
                  name='sekillendirmeYontemi'
                  label="sekillendirmeYontemi"
                  value={info.sekillendirmeYontemi}
                  onChange={handleChange}
                >
                  <MenuItem value="İzo Statik Pres">İzo Statik Pres</MenuItem>
                  <MenuItem value="Otomatik Torna">Otomatik Torna</MenuItem>
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
                <InputLabel id="karantina">Karantine Evet/Hayır</InputLabel>
                <Select
                  labelId="karantina"
                  id="karantina"
                  name='karantina'
                  label="karantina"
                  value={info.karantina}
                  onChange={handleChange}
                >
                  <MenuItem value="EVET">EVET</MenuItem>
                  <MenuItem value="HAYIR">HAYIR</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="firinkodu">Fırın Kodu</InputLabel>
                <Select
                  labelId="firinkodu"
                  id="firinkodu"
                  name='firinkodu'
                  label="firinkodu"
                  value={info.firinkodu}
                  onChange={handleChange}
                >
                  <MenuItem value="C600">C600</MenuItem>
                  <MenuItem value="C603">C603</MenuItem>
                </Select>
              </FormControl>

            </Box>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                name='aciklama'
                placeholder='Açıklama'
                sx={{ overflow: 'auto' }}
                value={info?.aciklama}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                name='aksiyon'
                placeholder='Aksiyon'
                sx={{ overflow: 'auto' }}
                value={info?.aksiyon}
                onChange={handleChange}
              />
            </Box>

            <TextField
              fullWidth
              label="Biskuvi Fırın Sorumlusu"
              name="biskuvifirinSorumlusu"
              id="biskuvifirinSorumlusu"
              type="text"
              variant="outlined"
              value={info.biskuvifirinSorumlusu}
              onChange={handleChange}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <TextField
                disabled={info.toplamAdet && info.kontroledilenAdet && info.hataliUrunSayisi ? false : true}
                fullWidth
                label="Ayak Çatlağı"
                name="ayakcatlagi"
                id="ayakcatlagi"
                type="text"
                variant="outlined"
                value={info.ayakcatlagi}
                onChange={handleChange}
              />
              <TextField
                disabled={info.toplamAdet && info.kontroledilenAdet && info.hataliUrunSayisi ? false : true}
                fullWidth
                label="Kenar Çatlağı"
                name="kenarCatlagi"
                id="kenarCatlagi"
                type="text"
                variant="outlined"
                value={info.kenarCatlagi}
                onChange={handleChange}
              />
              <TextField
                disabled={info.toplamAdet && info.kontroledilenAdet && info.hataliUrunSayisi ? false : true}
                fullWidth
                label="Fırın Kırığı"
                name="firinKirigi"
                id="firinKirigi"
                type="text"
                variant="outlined"
                value={info.firinKirigi}
                onChange={handleChange}
              />
              <TextField
                disabled={info.toplamAdet && info.kontroledilenAdet && info.hataliUrunSayisi ? false : true}
                fullWidth
                label="Diğer"
                name="diger"
                id="diger"
                type="text"
                variant="outlined"
                value={info.diger}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <TextField
                disabled
                fullWidth
                label="AÇ %"
                name="ayakcatlagi"
                id="ayakcatlagi"
                type="text"
                variant="outlined"
                value={info.ayakCatlagiYuzdesi}
                onChange={handleChange}
              />
              <TextField
                disabled
                fullWidth
                label="KÇ %"
                name="kenarCatlagi"
                id="kenarCatlagi"
                type="text"
                variant="outlined"
                value={info.kenarCatlagiYuzdesi}
                onChange={handleChange}
              />
              <TextField
                disabled
                fullWidth
                label="FK %"
                name="firinKirigi"
                id="firinKirigi"
                type="text"
                variant="outlined"
                value={info.firinKirigiYuzdesi}
                onChange={handleChange}
              />
              <TextField
                disabled
                fullWidth
                label="Diğer %"
                name="diger"
                id="diger"
                type="text"
                variant="outlined"
                value={info.digerYuzdesi}
                onChange={handleChange}
              />
            </Box>


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

export default BiskuviTriyajModal