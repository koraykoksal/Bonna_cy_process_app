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

const AyakTaslamaModal=({open,setOpen,handleOpen})=>{

  const handleClose = () => setOpen(false);

  const handleChange=(e)=>{
    setayakTaslamaData({...ayakTaslamaData,[e.target.name]:e.target.value})
    
  }


  const control=()=>{
    setayakTaslamaData(
      
      {...ayakTaslamaData,
      uygunsuzlukOrani:(Number(ayakTaslamaData.uygunsuzAdet) / Number(ayakTaslamaData.kontrolAdet)).toFixed(2),
      
      }


    )
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

  const [ayakTaslamaData, setayakTaslamaData] = useState({
    urun_kodu:"",
    renkkodu:"",
    kontrolAdet:"",
    uygunsuzAdet:"",
    uygunsuzlukOrani:0,
    makineParametreKontrolu:"",
    aciklama:"",
    vardiya:getShift(),
    date:currentdate.toString(),
    time:currentTime.toString(),
    kontroleden_kisi:currentUser
  })


  useEffect(() => {
    
    control()

  }, [
    ayakTaslamaData.kontrolAdet,
    ayakTaslamaData.uygunsuzAdet,
    ])
  
 

  console.log(ayakTaslamaData)

  


  
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
                Ayak Taşlama
            </Typography>

            <IconButton onClick={()=>handleClose()}>
                <HighlightOffIcon sx={{color:'#C70039',fontSize:'28px'}}/>
            </IconButton>
        </Box>
          
            
            <Box sx={{mt:3,display:'flex',flexDirection:'column',gap:2}} component='form'>
                

            <Box sx={{display:'flex',justifyContent:'space-between',gap:2}}>

            <FormControl fullWidth>
                <InputLabel id="urun_kodu">Ürün Kodu</InputLabel>
                <Select
                labelId="urun_kodu"
                id="urun_kodu"
                name='urun_kodu'
                label="urun_kodu"
                value={ayakTaslamaData.urun_kodu}
                onChange={handleChange}
                >
                <MenuItem value="GRM23DZ">GRM23DZ</MenuItem>
                <MenuItem value="BNC02CT">BNC02CT</MenuItem>
                <MenuItem value="VNT22KS">VNT22KS</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="renkkodu">Renk Kodu</InputLabel>
                <Select
                labelId="renkkodu"
                id="renkkodu"
                name='renkkodu'
                label="renkkodu"
                value={ayakTaslamaData.renkkodu}
                onChange={handleChange}
                >
                <MenuItem value="ASC">ASC</MenuItem>
                <MenuItem value="ASD">ASD</MenuItem>
                <MenuItem value="ASF">ASF</MenuItem>
                </Select>
            </FormControl>

            </Box>
            


            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            <TextField
            required
            fullWidth
            label="Kontrol Adet"
            name="kontrolAdet"
            id="kontrolAdet"
            type="text"
            variant="outlined"
            value={ayakTaslamaData.kontrolAdet}
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
            value={ayakTaslamaData.uygunsuzAdet}
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
            value={ayakTaslamaData.uygunsuzlukOrani}
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
            value={ayakTaslamaData.makineParametreKontrolu}
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
            value={ayakTaslamaData.aciklama}
            onChange={handleChange}
            /> 
            
            

            <Button
            variant='contained'
            fullWidth
            type='submit'
            // onClick={handleSubmit}
            >
                Save
            </Button>


            </Box>

          
        </Box>
      </Modal>
    </div>
  );
}

export default AyakTaslamaModal