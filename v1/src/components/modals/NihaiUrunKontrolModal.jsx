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

const NihaiUrunKontrolModal = ({ open, handleClose, handleOpen, materialCode, designCode }) => {

  

  const handleChange = (e) => {
    setnihaiUrunData({ ...nihaiUrunData, [e.target.name]: e.target.value })
  }

  const nowData = new Date()
  const currentdate = nowData.getDate() + "-" + (nowData.getMonth() + 1) + "-" + nowData.getFullYear()
  const currentTime = nowData.getHours() + ":" + nowData.getMinutes()

  const { currentUser } = useSelector((state) => state.auth)

  let getVardiya = 0;

  const getShift = () => {
    const now = new Date().getHours()

    if (now > 8 && now < 16) {
      getVardiya = 2
    }
    else if (now > 16 && now < 23) {
      getVardiya = 3
    }
    else {
      getVardiya = 1
    }

    return getVardiya

  }

  const [nihaiUrunData, setnihaiUrunData] = useState({
    renkKodu: "",
    aciklama: "",
    urun_kodu: "",
    olculenNumuneSayisi: "",
    agirlik: "",
    cap_ab: "",
    cap_cd: "",
    cap_e1e2: "",
    yukseklik_a: "",
    yukseklik_b: "",
    yukseklik_c: "",
    yukseklik_d: "",
    icYukseklik: "",
    dudak_a: "",
    dudak_b: "",
    dudak_c: "",
    dudak_d: "",
    ayakYuksekligi: "",
    bombeCokme: "",
    duzlemdenSapma: "",

    vardiya: getShift(),
    date: currentdate.toString(),
    time: currentTime.toString(),
    kontroleden_kisi: currentUser
  })

  const [newValue, setnewValue] = useState([])

  useEffect(() => {

    //designCode array içinde value bilgileri tek bir array içine alınır
    const data1 = designCode.map(item => item.DESENKODU)

    //array içindeki bilgileri alfabetik sıraya göre listelenir
    const data2 = data1.sort()

    setnewValue(data2)

  }, [designCode])



  return (
    <div>
      
      <Modal
        keepMounted
        open={open}
        onClose={()=>{
          setnewValue({
            renkKodu: "",
            aciklama: "",
            urun_kodu: "",
            olculenNumuneSayisi: "",
            agirlik: "",
            cap_ab: "",
            cap_cd: "",
            cap_e1e2: "",
            yukseklik_a: "",
            yukseklik_b: "",
            yukseklik_c: "",
            yukseklik_d: "",
            icYukseklik: "",
            dudak_a: "",
            dudak_b: "",
            dudak_c: "",
            dudak_d: "",
            ayakYuksekligi: "",
            bombeCokme: "",
            duzlemdenSapma: "",
            vardiya: getShift(),
            date: currentdate.toString(),
            time: currentTime.toString(),
            kontroleden_kisi: currentUser
          })
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


          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '600px' }} component='form'>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              {/* makine */}
              <FormControl fullWidth>
                <InputLabel id="renkKodu">Renk Kodu</InputLabel>
                <Select
                  labelId="renkKodu"
                  id="renkKodu"
                  name='renkKodu'
                  label="renkKodu"
                  value={nihaiUrunData.renkKodu}
                  onChange={handleChange}
                >
                  {
                    newValue?.map((item, index) => (
                      <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              {/* ürün kodu */}
              <FormControl fullWidth>
                <InputLabel id="urun_kodu">Ürün Kodu</InputLabel>
                <Select
                  labelId="urun_kodu"
                  id="urun_kodu"
                  name='urun_kodu'
                  label="urun_kodu"
                  value={nihaiUrunData.urun_kodu}
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
                label="Ölçülen Numune Sayısı"
                name="olculenNumuneSayisi"
                id="olculenNumuneSayisi"
                type="text"
                variant="outlined"
                value={nihaiUrunData.olculenNumuneSayisi}
                onChange={handleChange}
              />


              <TextField
                fullWidth
                label="Ağırlık (gr)"
                name="agirlik"
                id="agirlik"
                type="text"
                variant="outlined"
                value={nihaiUrunData.agirlik}
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
                  value={nihaiUrunData.cap_ab}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="C-D"
                  name="cap_cd"
                  id="cap_cd"
                  type="text"
                  variant="outlined"
                  value={nihaiUrunData.cap_cd}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="E1-E2"
                  name="cap_e1e2"
                  id="cap_e1e2"
                  type="text"
                  variant="outlined"
                  value={nihaiUrunData.cap_e1e2}
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
                  value={nihaiUrunData.yukseklik_a}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="B"
                  name="yukseklik_b"
                  id="yukseklik_b"
                  type="text"
                  variant="outlined"
                  value={nihaiUrunData.yukseklik_b}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="C"
                  name="yukseklik_c"
                  id="yukseklik_c"
                  type="text"
                  variant="outlined"
                  value={nihaiUrunData.yukseklik_c}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="D"
                  name="yukseklik_d"
                  id="yukseklik_d"
                  type="text"
                  variant="outlined"
                  value={nihaiUrunData.yukseklik_d}
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
              value={nihaiUrunData.icYukseklik}
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
                  value={nihaiUrunData.dudak_a}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="B"
                  name="dudak_b"
                  id="dudak_b"
                  type="text"
                  variant="outlined"
                  value={nihaiUrunData.dudak_b}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="C"
                  name="dudak_c"
                  id="dudak_c"
                  type="text"
                  variant="outlined"
                  value={nihaiUrunData.dudak_c}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="D"
                  name="dudak_d"
                  id="dudak_d"
                  type="text"
                  variant="outlined"
                  value={nihaiUrunData.dudak_d}
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
                value={nihaiUrunData.ayakYuksekligi}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Bombe Çökme"
                name="bombeCokme"
                id="bombeCokme"
                type="text"
                variant="outlined"
                value={nihaiUrunData.bombeCokme}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Düzlemden Sapma"
                name="duzlemdenSapma"
                id="duzlemdenSapma"
                type="text"
                variant="outlined"
                value={nihaiUrunData.duzlemdenSapma}
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
              value={nihaiUrunData.aciklama}
              onChange={handleChange}
            />




            <Button
              variant='contained'
              fullWidth
              type='submit'
            >
              Save
            </Button>


          </Box>


        </Box>
      </Modal>
    </div>
  );
}

export default NihaiUrunKontrolModal