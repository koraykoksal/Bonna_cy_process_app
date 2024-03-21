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

const DijitalBaskiModal = ({ open, handleClose, info, setInfo }) => {


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
      putFireData('DijitalBaski', info)
      getFireData("DijitalBaski")
    }
    else {
      postFireData("DijitalBaski", info)
      getFireData("DijitalBaski")
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
              Dijital Baskı
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
            </IconButton>
          </Box>


          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '550px' }} component='form' onSubmit={handleSubmit}>


            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>


              <FormControl fullWidth>
                <InputLabel id="tasarim_kodu">Tasarım Kodu</InputLabel>
                <Select
                  labelId="tasarim_kodu"
                  id="tasarim_kodu"
                  name='tasarim_kodu'
                  label="tasarim_kodu"
                  value={info.tasarim_kodu}
                  onChange={handleChange}
                >
                  {
                    desenCodes?.map((item, index) => (
                      <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              {/* <FormControl fullWidth>
                <InputLabel id="urun_kodu">Ürün Kodu</InputLabel>
                <Select
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
                <InputLabel id="silimsvoltajuyu">Voltaj</InputLabel>
                <Select
                  labelId="voltaj"
                  id="voltaj"
                  name='voltaj'
                  label="voltaj"
                  value={info.voltaj}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="basinc">Basınç</InputLabel>
                <Select
                  labelId="basinc"
                  id="basinc"
                  name='basinc'
                  label="basinc"
                  value={info.basinc}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                sx={{ backgroundColor: '#78C1F3', label: { color: '#000000' } }}
                fullWidth
                label="Mavi"
                name="mavi"
                id="mavi"
                type="text"
                variant="outlined"
                value={info.mavi}
                onChange={handleChange}
              />

              <TextField
                sx={{ backgroundColor: '#EDB7ED', label: { color: '#000000' } }}
                fullWidth
                label="Pembe"
                name="pembe"
                id="pembe"
                type="text"
                variant="outlined"
                value={info.pembe}
                onChange={handleChange}
              />

              <TextField
                sx={{ backgroundColor: '#F2F7A1', label: { color: '#000000' } }}
                fullWidth
                label="Sarı"
                name="sari"
                id="sari"
                type="text"
                variant="outlined"
                value={info.sari}
                onChange={handleChange}
              />


            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                sx={{ backgroundColor: '#DFA878', label: { color: '#000000' } }}
                fullWidth
                label="Kahverengi"
                name="kahverengi"
                id="kahverengi"
                type="text"
                variant="outlined"
                value={info.kahverengi}
                onChange={handleChange}
              />

              <TextField
                sx={{ backgroundColor: '#A2C579', label: { color: '#000000' } }}
                fullWidth
                label="Yeşil"
                name="yesil"
                id="yesil"
                type="text"
                variant="outlined"
                value={info.yesil}
                onChange={handleChange}
              />

              <TextField
                sx={{ backgroundColor: '#61677A', label: { color: '#000000' } }}
                fullWidth
                label="Siyah"
                name="siyah"
                id="siyah"
                type="text"
                variant="outlined"
                value={info.siyah}
                onChange={handleChange}
              />


            </Box>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Reaktif"
                name="reaktif"
                id="reaktif"
                type="text"
                variant="outlined"
                value={info.reaktif}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Beyaz"
                name="beyaz"
                id="beyaz"
                type="text"
                variant="outlined"
                value={info.beyaz}
                onChange={handleChange}
              />

              <FormControl fullWidth>
                <InputLabel id="desenGorseli">Görsel</InputLabel>
                <Select
                  labelId="desenGorseli"
                  id="desenGorseli"
                  name='desenGorseli'
                  label="desenGorseli"
                  value={info.desenGorseli}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOT">NOT</MenuItem>
                </Select>
              </FormControl>



            </Box>


            <TextField
              multiline
              fullWidth
              label="Hata Tanımı"
              name="hataTanimi"
              id="hataTanimi"
              type="text"
              variant="outlined"
              value={info.hataTanimi}
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
            >
              {info?.id ? "Update Data" : "Add New Data"}
            </Button>


          </Box>


        </Box>
      </Modal>
    </div>
  );
}

export default DijitalBaskiModal