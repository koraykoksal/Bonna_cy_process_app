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

const ReaktifModal=({open,setOpen,handleOpen})=>{

  const handleClose = () => setOpen(false);

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
    urun_kodu:"",
    boyasarjno:"",
    boyayogunluk:"",
    boyamiktari:"",
    
    aciklama:"",
    redkabul:"",
    
    vardiya:getShift(),
    date:currentdate.toString(),
    time:currentTime.toString(),
    kontroleden_kisi:currentUser
  })


  console.log(astarlamaData)


  return (
    <div>
      <Button onClick={handleOpen} variant='outlined'>New</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
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
          
            
            <Box sx={{mt:3,display:'flex',flexDirection:'column',gap:2}} component='form'>
                

            <FormControl fullWidth>
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
            </FormControl>
            

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            
            <TextField
            fullWidth
            label="Boya Şarj No"
            name="boyasarjno"
            id="boyasarjno"
            type="text"
            variant="outlined"
            value={astarlamaData.boyasarjno}
            onChange={handleChange}
            />


            <TextField
            fullWidth
            label="Boya Yoğunluk"
            name="boyayogunluk"
            id="boyayogunluk"
            type="text"
            variant="outlined"
            value={astarlamaData.boyayogunluk}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Boya Miktarı"
            name="boyamiktari"
            id="boyamiktari"
            type="text"
            variant="outlined"
            value={astarlamaData.boyamiktari}
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


            <Textarea
            name='aciklama'
            fullWidth
            placeholder='Açıklama/Aksiyon'
            minRows={3}
            maxRows={3}
            sx={{overflow:'auto'}}
            value={astarlamaData?.aciklama}
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

export default ReaktifModal