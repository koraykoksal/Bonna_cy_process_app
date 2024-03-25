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

const SirlamaModal = ({ open, handleClose, info, setInfo,workCenterCode, materialCode, designCode }) => {


  const [searchUrunKodu, setSearchUrunKodu] = useState(null)
  const [searchRenkKodu, setSearchRenkKodu] = useState(null)
  const [searchSorunTipi, setSearchSorunTipi] = useState(null)


  const handleChange = (e, newValue, fieldName) => {
    // setInfo({ ...info, [e.target.name]: e.target.value, ['urun_kodu']: search ? search.MALZEMEKODU : ""  })

    // Autocomplete'ten gelen olaylar için
    if (fieldName) {
      setInfo(prevInfo => ({
        ...prevInfo,
        [fieldName]: newValue?.MALZEMEKODU || newValue?.text || newValue || ""
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
  const [desenCodes, setdesenCodes] = useState([])

  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('Sirlama', info)
      getFireData("Sirlama")
    }
    else {
      postFireData("Sirlama", info)
      getFireData("Sirlama")
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
              Sırlama
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
            </IconButton>
          </Box>


          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '550px' }} component='form' onSubmit={handleSubmit}>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              {/* makine */}
              <FormControl fullWidth>
                <InputLabel id="uretimyeri">Üretim Yeri</InputLabel>
                <Select
                  required
                  labelId="uretimyeri"
                  id="uretimyeri"
                  name='uretimyeri'
                  label="uretimyeri"
                  value={info.uretimyeri}
                  onChange={handleChange}
                >
                  {
                    workCenterCode?.filter(data => data.ISMERKEZI.includes('SR')).map(({ ISMERKEZI, index }) => (
                      <MenuItem key={index} value={ISMERKEZI}>{ISMERKEZI}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

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

              <Autocomplete
                fullWidth
                value={searchRenkKodu}
                name='renkKodu'
                onChange={(event, newValue) => {
                  setSearchRenkKodu(newValue);
                  handleChange(event, newValue, 'renkKodu')
                }}
                id="search-select-demo"
                options={desenCodes}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Renk Kodu" />}
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
                label="Sır Sıcaklık (°C)"
                name="sirSicaklik"
                id="sirSicaklik"
                type="text"
                variant="outlined"
                value={info.sirSicaklik}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Ph Değeri"
                name="ph"
                id="ph"
                type="text"
                variant="outlined"
                value={info.ph}
                onChange={handleChange}
              />
            </Box>

            <Box>

              <Typography variant='subtitle2' align='center'>
                Viskozite (°G)
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <TextField
                  fullWidth
                  label="V1"
                  name="viskozite_v1"
                  id="viskozite_v1"
                  type="text"
                  variant="outlined"
                  value={info.viskozite_v1}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="V2"
                  name="viskozite_v2"
                  id="viskozite_v2"
                  type="text"
                  variant="outlined"
                  value={info.viskozite_v2}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="Tiksotropi v1-v2"
                  name="viskozite_v1v2"
                  id="viskozite_v1v2"
                  type="text"
                  variant="outlined"
                  value={info.viskozite_v1v2}
                  onChange={handleChange}
                />
              </Box>

            </Box>



            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <TextField
                fullWidth
                label="Viskozite"
                name="viskozite"
                id="viskozite"
                type="text"
                variant="outlined"
                value={info.viskozite}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Tank Hızı"
                name="tankKazan_KaristirmaHizi"
                id="tankKazan_KaristirmaHizi"
                type="text"
                variant="outlined"
                value={info.tankKazan_KaristirmaHizi}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Turnet Hızı"
                name="balerinTurnetHizi"
                id="balerinTurnetHizi"
                type="text"
                variant="outlined"
                value={info.balerinTurnetHizi}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Gobek Hızı"
                name="balerinGobekHizi"
                id="balerinGobekHizi"
                type="text"
                variant="outlined"
                value={info.balerinGobekHizi}
                onChange={handleChange}
              />
            </Box>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Pompa Basıncı"
                name="pompaBasinci"
                id="pompaBasinci"
                type="text"
                variant="outlined"
                value={info.pompaBasinci}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Sır Gramajı"
                name="sirGramaji"
                id="sirGramaji"
                type="text"
                variant="outlined"
                value={info.sirGramaji}
                onChange={handleChange}
              />

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Aktif Nozül Alt"
                name="aktifNozulSayisi_alt"
                id="aktifNozulSayisi_alt"
                type="text"
                variant="outlined"
                value={info.aktifNozulSayisi_alt}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Aktif Nozül Üst"
                name="aktifNozulSayisi_ust"
                id="aktifNozulSayisi_ust"
                type="text"
                variant="outlined"
                value={info.aktifNozulSayisi_ust}
                onChange={handleChange}
              />

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>


              <TextField
                fullWidth
                label="Sır Taban"
                name="sirKalinligi_taban"
                id="sirKalinligi_taban"
                type="text"
                variant="outlined"
                value={info.sirKalinligi_taban}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Sır Kenar"
                name="sirKalinligi_kenar"
                id="sirKalinligi_kenar"
                type="text"
                variant="outlined"
                value={info.sirKalinligi_kenar}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Sır Orta"
                name="sirKalinligi_orta"
                id="sirKalinligi_orta"
                type="text"
                variant="outlined"
                value={info.sirKalinligi_orta}
                onChange={handleChange}
              />

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="biskuviKontrol">Bisküvi Kont.</InputLabel>
                <Select
                  labelId="biskuviKontrol"
                  id="biskuviKontrol"
                  name='biskuviKontrol'
                  label="biskuviKontrol"
                  value={info.biskuviKontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="biskuviSilimi_silimSuyu">Silim Suyu</InputLabel>
                <Select
                  labelId="biskuviSilimi_silimSuyu"
                  id="biskuviSilimi_silimSuyu"
                  name='biskuviSilimi_silimSuyu'
                  label="biskuviSilimi_silimSuyu"
                  value={info.biskuviSilimi_silimSuyu}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="biskuviSilimi_silimSungeri">Silim Sünger</InputLabel>
                <Select
                  labelId="biskuviSilimi_silimSungeri"
                  id="biskuviSilimi_silimSungeri"
                  name='biskuviSilimi_silimSungeri'
                  label="biskuviSilimi_silimSungeri"
                  value={info.biskuviSilimi_silimSungeri}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <FormControl fullWidth>
                <InputLabel id="biskuviSilimi_urunSilimi">Ürün Silim</InputLabel>
                <Select
                  labelId="biskuviSilimi_urunSilimi"
                  id="biskuviSilimi_urunSilimi"
                  name='biskuviSilimi_urunSilimi'
                  label="biskuviSilimi_urunSilimi"
                  value={info.biskuviSilimi_urunSilimi}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="makineYikanmasi">Mak.Yıkama</InputLabel>
                <Select
                  labelId="makineYikanmasi"
                  id="makineYikanmasi"
                  name='makineYikanmasi'
                  label="makineYikanmasi"
                  value={info.makineYikanmasi}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="manyetikYikanmasi">Man.Yıkama</InputLabel>
                <Select
                  labelId="manyetikYikanmasi"
                  id="manyetikYikanmasi"
                  name='manyetikYikanmasi'
                  label="manyetikYikanmasi"
                  value={info.manyetikYikanmasi}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <FormControl fullWidth>
                <InputLabel id="kazandaCokme">KazanÇökme</InputLabel>
                <Select
                  labelId="kazandaCokme"
                  id="kazandaCokme"
                  name='kazandaCokme'
                  label="kazandaCokme"
                  value={info.kazandaCokme}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="receteKontrolu">Reçete Kont.</InputLabel>
                <Select
                  labelId="receteKontrolu"
                  id="receteKontrolu"
                  name='receteKontrolu'
                  label="receteKontrolu"
                  value={info.receteKontrolu}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="ayakSilimi_silimSungeri">Sünger Silim</InputLabel>
                <Select
                  labelId="ayakSilimi_silimSungeri"
                  id="ayakSilimi_silimSungeri"
                  name='ayakSilimi_silimSungeri'
                  label="ayakSilimi_silimSungeri"
                  value={info.ayakSilimi_silimSungeri}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="ayakSilimi_urunAyakSilimi">Ürün Ayak Silimi</InputLabel>
                <Select
                  labelId="ayakSilimi_urunAyakSilimi"
                  id="ayakSilimi_urunAyakSilimi"
                  name='ayakSilimi_urunAyakSilimi'
                  label="ayakSilimi_urunAyakSilimi"
                  value={info.ayakSilimi_urunAyakSilimi}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="sirliUrunYuzeyKontrolu">Sırlı Yüzey Kontrol</InputLabel>
                <Select
                  labelId="sirliUrunYuzeyKontrolu"
                  id="sirliUrunYuzeyKontrolu"
                  name='sirliUrunYuzeyKontrolu'
                  label="sirliUrunYuzeyKontrolu"
                  value={info.sirliUrunYuzeyKontrolu}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="auraBoyaLekesiKontrol">Aura Boya Lekesi</InputLabel>
                <Select
                  labelId="auraBoyaLekesiKontrol"
                  id="auraBoyaLekesiKontrol"
                  name='auraBoyaLekesiKontrol'
                  label="auraBoyaLekesiKontrol"
                  value={info.auraBoyaLekesiKontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="auraBeklemeSuresiKontrol">Auro Bekleme Süresi</InputLabel>
                <Select
                  labelId="auraBeklemeSuresiKontrol"
                  id="auraBeklemeSuresiKontrol"
                  name='auraBeklemeSuresiKontrol'
                  label="auraBeklemeSuresiKontrol"
                  value={info.auraBeklemeSuresiKontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>
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
                renderInput={(params) => <TextField {...params} label="Sorun Tipi" />}
              />

              {/* <Button variant='contained' size='small' sx={{ textTransform: 'none' }} onClick={() => setInfo(prevInfo => ({ ...prevInfo, uygunsuzlukTipi: '' }))}>Reset</Button> */}

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

            </Box>


            <TextField
              multiline
              fullWidth
              label="Operatör"
              name="operator"
              id="operator"
              type="text"
              variant="outlined"
              value={info.operator}
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

export default SirlamaModal