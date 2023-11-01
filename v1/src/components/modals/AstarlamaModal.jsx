import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik,Form } from 'formik';
import { Container, IconButton, TextField, TextareaAutosize } from '@mui/material';
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

const AstarlamaModal=({open,handleClose,handleOpen})=>{

  

  const handleChange=(e)=>{
    setastarlamaData({...astarlamaData,[e.target.name]:e.target.value})
  }

  const nowData=new Date()
  const currentdate = nowData.getDate() +"-"+(nowData.getMonth()+1)+"-"+nowData.getFullYear()
  const currentTime = nowData.getHours() +":"+nowData.getMinutes()

  const {currentUser} = useSelector((state) => state.auth)

  let getVardiya = 0;

  const getShift=()=>{
    const now=new Date().getHours()

    if(now > 8 && now < 16){
        getVardiya = 2
    }
    else if(now > 16 && now < 23){
        getVardiya = 3
    }
    else{
        getVardiya = 1
    }

    return getVardiya

  }

  const [astarlamaData, setastarlamaData] = useState({
    is_merkezi:"",
    yogunluk:"",
    nozzlecap:"",
    kasetsicaklik:"",
    tankbasinc:"",
    asterkalinlik:"",
    astarlamayapankisi:"",
    aciklama:"",
    redkabul:"",
    urun_kodu:"",
    vardiya:getShift(),
    date:currentdate.toString(),
    time:currentTime.toString(),
    kontroleden_kisi:currentUser
  })


 

  return (
    <div>
      
      <Modal
        keepMounted
        open={open}
        onClose={()=>{
          setastarlamaData({
            is_merkezi:"",
            yogunluk:"",
            nozzlecap:"",
            kasetsicaklik:"",
            tankbasinc:"",
            asterkalinlik:"",
            astarlamayapankisi:"",
            aciklama:"",
            redkabul:"",
            urun_kodu:"",
            vardiya:getShift(),
            date:currentdate.toString(),
            time:currentTime.toString(),
            kontroleden_kisi:currentUser
          })
          handleClose()
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>

        <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>

            <Typography id="keep-mounted-modal-title" variant="h6" component="h2" color="#000000">
                Astarlama
            </Typography>

            <IconButton onClick={()=>handleClose()}>
                <HighlightOffIcon sx={{color:'#C70039',fontSize:'28px'}}/>
            </IconButton>
        </Box>
          
            
            <Box sx={{mt:3,display:'flex',flexDirection:'column',gap:2,overflow:'scroll',maxHeight:'600px'}} component='form'>
                

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

              {/* makine */}
            {/* <FormControl fullWidth>
                <InputLabel id="is_merkezi">Makine</InputLabel>
                <Select
                labelId="is_merkezi"
                id="is_merkezi"
                name='is_merkezi'
                label="is_merkezi"
                value={astarlamaData.is_merkezi}
                onChange={handleChange}
                >
                <MenuItem value="SK-KP1">SK-KP1</MenuItem>
                <MenuItem value="SK-KP2">SK-KP2</MenuItem>
                <MenuItem value="SK-KP3">SK-KP3</MenuItem>
                </Select>
            </FormControl> */}
            
            {/* ürün kodu */}
            {/* <FormControl fullWidth>
                <InputLabel id="urun_kodu">Ürün Kodu</InputLabel>
                <Select
                labelId="urun_kodu"
                id="urun_kodu"
                name='urun_kodu'
                label="urun_kodu"
                value={astarlamaData.urun_kodu}
                onChange={handleChange}
                >
                <MenuItem value="GRM23DZ">GRM23DZ</MenuItem>
                <MenuItem value="BNC02CT">BNC02CT</MenuItem>
                <MenuItem value="VNT22KS">VNT22KS</MenuItem>
                </Select>
            </FormControl> */}
            
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            
            <TextField
            fullWidth
            label="Yoğunluk"
            name="yogunluk"
            id="yogunluk"
            type="text"
            variant="outlined"
            value={astarlamaData.yogunluk}
            onChange={handleChange}
            />


            <TextField
            fullWidth
            label="Nozzle Çapı"
            name="nozzlecap"
            id="nozzlecap"
            type="text"
            variant="outlined"
            value={astarlamaData.nozzlecap}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Kaset Sıcaklığı"
            name="kasetsicaklik"
            id="kasetsicaklik"
            type="text"
            variant="outlined"
            value={astarlamaData.kasetsicaklik}
            onChange={handleChange}
            />
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            
            <TextField
            fullWidth
            label="Tank Basınç"
            name="tankbasinc"
            id="tankbasinc"
            type="text"
            variant="outlined"
            value={astarlamaData.tankbasinc}
            onChange={handleChange}
            />


            <TextField
            fullWidth
            label="Astar Kalinlik"
            name="asterkalinlik"
            id="asterkalinlik"
            type="text"
            variant="outlined"
            value={astarlamaData.asterkalinlik}
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
            value={astarlamaData.astarlamayapankisi}
            onChange={handleChange}
            />

            <FormControl fullWidth>
                <InputLabel id="redkabul">Red/Kabul/Şartlı Kabul</InputLabel>
                <Select
                labelId="redkabul"
                id="redkabul"
                name='redkabul'
                label="redkabul"
                value={astarlamaData.redkabul}
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
            label="Açıklama/Aksiyon"
            name="aciklama"
            id="aciklama"
            type="text"
            variant="outlined"
            value={astarlamaData.aciklama}
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

export default AstarlamaModal