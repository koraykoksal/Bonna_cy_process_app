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

const AyakTaslamaModal = ({ open, handleClose, info, setInfo,materialCode, designCode }) => {

  const [searchUrunKodu, setSearchUrunKodu] = useState(null)
  const [searchRenkKodu, setSearchRenkKodu] = useState(null)

  const handleChange = (e, newValue, fieldName) => {
    // setInfo({ ...info, [e.target.name]: e.target.value, ['urun_kodu']: search ? search.MALZEMEKODU : ""  })

    // Autocomplete'ten gelen olaylar için
    if (fieldName) {
      setInfo(prevInfo => ({
        ...prevInfo,
        [fieldName]: newValue?.MALZEMEKODU || newValue || ""
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
      putFireData('AyakTaslama', info)
      getFireData("AyakTaslama")
    }
    else {
      postFireData("AyakTaslama", info)
      getFireData("AyakTaslama")
    }

    handleClose()

  }


  useEffect(() => {

    const data = designCode.map((item) => item.DESENKODU)
    const dataSort = data.sort()
    setdesenCodes(dataSort)

  }, [designCode])


  useEffect(() => {

    setInfo(

      {
        ...info, uygunsuzlukOrani: (Number(info.uygunsuzAdet) / Number(info.kontrolAdet)).toFixed(2),
      }

    )

  }, [
    info.kontrolAdet,
    info.uygunsuzAdet,
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
              Ayak Taşlama
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
            </IconButton>
          </Box>


          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '550px' }} component='form' onSubmit={handleSubmit}>


            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>

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
                renderInput={(params) => <TextField required {...params} label="Ürün Kodu" />}
              />

              <Autocomplete
                fullWidth
                value={searchRenkKodu}
                name='renkkodu'
                onChange={(event, newValue) => {
                  setSearchRenkKodu(newValue);
                  handleChange(event, newValue, 'renkkodu')
                }}
                id="search-select-demo"
                options={desenCodes}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField required {...params} label="Renk Kodu" />}
              />

            </Box>



            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <TextField
                required
                fullWidth
                label="Kontrol Adet"
                name="kontrolAdet"
                id="kontrolAdet"
                type="text"
                variant="outlined"
                value={info.kontrolAdet}
                onChange={handleChange}
              />
              <TextField
                required
                fullWidth
                label="Uygunsuz Adet"
                name="uygunsuzAdet"
                id="uygunsuzAdet"
                type="text"
                variant="outlined"
                value={info.uygunsuzAdet}
                onChange={handleChange}
              />
              <TextField
                disabled
                fullWidth
                label="Uygunsuz Oran"
                name="uygunsuzlukOrani"
                id="uygunsuzlukOrani"
                type="text"
                variant="outlined"
                value={info.uygunsuzlukOrani}
                onChange={handleChange}
              />
            </Box>

            <TextField
              fullWidth
              label="Makine Parametre Kontrolü"
              name="makineParametreKontrolu"
              id="makineParametreKontrolu"
              type="text"
              variant="outlined"
              value={info.makineParametreKontrolu}
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

export default AyakTaslamaModal