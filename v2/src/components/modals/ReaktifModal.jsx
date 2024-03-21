import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik,Form } from 'formik';
import { Autocomplete, Container, IconButton, TextField, TextareaAutosize } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { sorunTipi,aksiyonSahibi } from '../../helpers/ProcessData';
import Textarea from '@mui/joy/Textarea';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState ,useEffect} from 'react';
import {uygunsuzlukTipi} from "../../helpers/ProcessData"
import {useSelector} from "react-redux"
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

const ReaktifModal=({open, handleClose, info, setInfo })=>{

  const [search, setSearch] = useState(null)
  
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value,['urun_kodu']:search ? search.MALZEMEKODU : ""  })
  }

  const { getFireData, putFireData, postFireData } = useArge()
  const {  materialCode } = useSelector((state) => state.arge)


  const handleSubmit = (e) => {

    e.preventDefault()

    if (info.id) {
      putFireData('Reaktif', info)
      getFireData("Reaktif")
    }
    else {
      postFireData("Reaktif", info)
      getFireData("Reaktif")
    }

    handleClose()

  }



  return (
    <div>
      
      <Modal
        keepMounted
        open={open}
        onClose={()=>{
          handleClose()
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>

        <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>

            <Typography id="keep-mounted-modal-title" variant="h6" component="h2" color="#000000">
                Reaktif
            </Typography>

            <IconButton onClick={()=>handleClose()}>
                <HighlightOffIcon sx={{color:'#C70039',fontSize:'28px'}}/>
            </IconButton>
        </Box>
          
            
            <Box sx={{mt:3,display:'flex',flexDirection:'column',gap:2,overflow:'scroll',maxHeight:'550px'}} component='form' onSubmit={handleSubmit}>
                

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
                    materialCode?.map(({MALZEMEKODU,index})=>(
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
                // style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Ürün Kodu" />}
              />


            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            
            <TextField
            fullWidth
            label="Boya Şarj No"
            name="boyasarjno"
            id="boyasarjno"
            type="text"
            variant="outlined"
            value={info.boyasarjno}
            onChange={handleChange}
            />


            <TextField
            fullWidth
            label="Boya Yoğunluk"
            name="boyayogunluk"
            id="boyayogunluk"
            type="text"
            variant="outlined"
            value={info.boyayogunluk}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Boya Miktarı"
            name="boyamiktari"
            id="boyamiktari"
            type="text"
            variant="outlined"
            value={info.boyamiktari}
            onChange={handleChange}
            />
            </Box>


            <TextField
            fullWidth
            label="Astarlama Yapan Kişi"
            name="astarlamayapankisi"
            id="astarlamayapankisi"
            type="text"
            variant="outlined"
            value={info.astarlamayapankisi}
            onChange={handleChange}
            />

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

export default ReaktifModal