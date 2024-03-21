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

const OtomatikTornaModal = ({ open, handleClose, info, setInfo, workCenterCode, materialCode }) => {


  const [search, setSearch] = useState(null)

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value,['urun_kodu']:search.MALZEMEKODU })
  }

  const { getFireData, putFireData, postFireData } = useArge()


  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('OtomatikTorna', info)
      getFireData("OtomatikTorna")
    }
    else {
      postFireData("OtomatikTorna", info)
      getFireData("OtomatikTorna")
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
              Otomatik Torna
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
                    workCenterCode?.filter((data) => data.ISMERKEZI.includes('SK-OT')).map(({ ISMERKEZI, index }) => (
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
                    materialCode?.map(({ MALZEMEKODU, index }) => (
                      <MenuItem key={index} value={MALZEMEKODU}>{MALZEMEKODU}</MenuItem>
                    ))
                  }

                  <MenuItem value="BNC02CT">BNC02CT</MenuItem>
                  <MenuItem value="VNT22KS">VNT22KS</MenuItem>
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
                // style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Ürün Kodu" />}
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

                value={info.agirlik}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Taban (mm) "
                name="taban"
                id="taban"
                type="text"
                variant="outlined"

                value={info.taban}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Kenar (mm)"
                name="kenar"
                id="kenar"
                type="text"
                variant="outlined"

                value={info.kenar}
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

                value={info.pkenar}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Çap (mm)"
                name="cap"
                id="cap"
                type="text"
                variant="outlined"

                value={info.cap}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Ayna Çapı (mm)"
                name="aynacap"
                id="aynacap"
                type="text"
                variant="outlined"

                value={info.aynacap}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <TextField
                fullWidth
                label="Kulp-Bünye % Nem"
                name="kulpbunye"
                id="kulpbunye"
                type="text"
                variant="outlined"

                value={info.kulpbunye}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Kesilen Sucuk (gr)"
                name="kesilensucuk"
                id="kesilensucuk"
                type="text"
                variant="outlined"

                value={info.kesilensucuk}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="% Kırpıntı Miktarı"
                name="kirpintimiktar"
                id="kirpintimiktar"
                type="text"
                variant="outlined"

                value={info.kirpintimiktar}
                onChange={handleChange}
              />


            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

              <TextField
                fullWidth
                label="Çamur Sertlik"
                name="camursert"
                id="camursert"
                type="text"
                variant="outlined"

                value={info.camursert}
                onChange={handleChange}
              />

              <FormControl fullWidth>
                <InputLabel id="kelepenozulkontrol">KNK</InputLabel>
                <Select
                  labelId="kelepenozulkontrol"
                  id="kelepenozulkontrol"
                  name='kelepenozulkontrol'
                  label="kelepenozulkontrol"
                  value={info.kelepenozulkontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="havakontrol">HK</InputLabel>
                <Select
                  labelId="havakontrol"
                  id="havakontrol"
                  name='havakontrol'
                  label="havakontrol"
                  value={info.havakontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                </Select>
              </FormControl>

            </Box>


            {/* uygunsuz işlem - standart değer */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>



              <FormControl fullWidth>
                <InputLabel id="catlakkontrol">ÇK</InputLabel>
                <Select
                  labelId="catlakkontrol"
                  id="catlakkontrol"
                  name='catlakkontrol'
                  label="catlakkontrol"
                  value={info.catlakkontrol}
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
                  value={info.rotuskontrol}
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
                  value={info.yuzeykontrol}
                  onChange={handleChange}
                >
                  <MenuItem value="OK">OK</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                </Select>
              </FormControl>

            </Box>

            {/* aksiyon sahibi */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
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

              {/* select içinde selçilen değeri resetlemek için kullanılan buton */}
              <Button variant='contained' size='small' sx={{ textTransform: 'none' }} onClick={() => setInfo(prevInfo => ({ ...prevInfo, uygunsuzluktipi: '' }))}>Reset</Button>



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

export default OtomatikTornaModal