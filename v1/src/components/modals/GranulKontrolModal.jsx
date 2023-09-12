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

const GranulKontrolModal=({open,setOpen,handleOpen})=>{

  const handleClose = () => setOpen(false);

  const handleChange=(e)=>{
    setgranulkontrolData({...granulkontrolData,[e.target.name]:e.target.value})
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

  const [granulkontrolData, setgranulkontrolData] = useState({
    is_merkezi:"",
    hammaddenem:"",
    prosesnem:"",
    bigbagtarih:"",
    bigbagkodu:"",
    granulkodu:"",
    redkabul:"",
    aciklama:"",
    vardiyasorumlusu:"",
    urun_kodu:"",
    vardiya:getShift(),
    date:currentdate.toString(),
    time:currentTime.toString(),
    kontroleden_kisi:currentUser
  })


  console.log(granulkontrolData)


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
                Granül Kontrol
            </Typography>

            <IconButton onClick={()=>handleClose()}>
                <HighlightOffIcon sx={{color:'#C70039',fontSize:'28px'}}/>
            </IconButton>
        </Box>
          
            
            <Box sx={{mt:3,display:'flex',flexDirection:'column',gap:2}} component='form'>
                

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

              {/* makine */}
            <FormControl fullWidth>
                <InputLabel id="is_merkezi">Makine</InputLabel>
                <Select
                labelId="is_merkezi"
                id="is_merkezi"
                name='is_merkezi'
                label="is_merkezi"
                value={granulkontrolData.is_merkezi}
                onChange={handleChange}
                >
                <MenuItem value="SK-KP1">SK-KP1</MenuItem>
                <MenuItem value="SK-KP2">SK-KP2</MenuItem>
                <MenuItem value="SK-KP3">SK-KP3</MenuItem>
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
                value={granulkontrolData.urun_kodu}
                onChange={handleChange}
                >
                <MenuItem value="GRM23DZ">GRM23DZ</MenuItem>
                <MenuItem value="BNC02CT">BNC02CT</MenuItem>
                <MenuItem value="VNT22KS">VNT22KS</MenuItem>
                </Select>
            </FormControl>
            
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            <TextField
            fullWidth
            label="Granül Kodu"
            name="granulkodu"
            id="granulkodu"
            type="text"
            variant="outlined"
            value={granulkontrolData.granulkodu}
            onChange={handleChange}
            />


            <TextField
            fullWidth
            label="Bigbag Kodu"
            name="bigbagkodu"
            id="bigbagkodu"
            type="text"
            variant="outlined"
            value={granulkontrolData.bigbagkodu}
            onChange={handleChange}
            />
            </Box>

            <TextField
            fullWidth
            name="bigbagtarih"
            id="bigbagtarih"
            type="date"
            variant="outlined"
            value={granulkontrolData.bigbagtarih}
            onChange={handleChange}
            />

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            <TextField
            fullWidth
            label="Hammadde Nem Ölçüm"
            name="hammaddenem"
            id="hammaddenem"
            type="text"
            variant="outlined"
            value={granulkontrolData.hammaddenem}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Proses Nem Ölçüm"
            name="prosesnem"
            id="prosesnem"
            type="text"
            variant="outlined"
            value={granulkontrolData.prosesnem}
            onChange={handleChange}
            />
            </Box>
            



            <FormControl fullWidth>
                <InputLabel id="redkabul">Red/Kabul/Şartlı Kabul</InputLabel>
                <Select
                labelId="redkabul"
                id="redkabul"
                name='redkabul'
                label="redkabul"
                value={granulkontrolData.redkabul}
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
            value={granulkontrolData?.aciklama}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Vardiya Sorumlusu veya Operatör"
            name="vardiyasorumlusu"
            id="vardiyasorumlusu"
            type="text"
            variant="outlined"
            
            value={granulkontrolData.vardiyasorumlusu}
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

export default GranulKontrolModal