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

const UygunsuzlukModal=({open,setOpen,handleOpen})=>{

  const handleClose = () => setOpen(false);

  const handleChange=(e)=>{
    setUygunsuzlukData({...uygunsuzlukData,[e.target.name]:e.target.value})
  }

  const nowData=new Date()
  const currentdatetime = nowData.getDate() +"-"+(nowData.getMonth()+1)+"-"+nowData.getFullYear()

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

  const [uygunsuzlukData, setUygunsuzlukData] = useState({
    is_merkezi:"",
    renk_kodu:"",
    urun_kodu:"",
    sorun_tipi:"",
    uygunsuz_deger:"",
    standart_deger:"",
    aksiyon_sahibi:"",
    aciklama:"",
    aksiyon:"",
    vardiya:getShift(),
    date:currentdatetime.toString()
  })




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
                Uygunsuzluk
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
                value={uygunsuzlukData.is_merkezi}
                onChange={handleChange}
                >
                <MenuItem value="SK-KP1">SK-KP1</MenuItem>
                <MenuItem value="SK-KP2">SK-KP2</MenuItem>
                <MenuItem value="SK-KP3">SK-KP3</MenuItem>
                </Select>
            </FormControl>

            {/* renk kodu */}
            <FormControl fullWidth>
                <InputLabel id="renk_kodu">Renk Kodu</InputLabel>
                <Select
                labelId="renk_kodu"
                id="renk_kodu"
                name='renk_kodu'
                label="renk_kodu"
                value={uygunsuzlukData.renk_kodu}
                onChange={handleChange}
                >
                <MenuItem value="ASC">ASC</MenuItem>
                <MenuItem value="ASD">ASD</MenuItem>
                <MenuItem value="ASF">ASF</MenuItem>
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
                value={uygunsuzlukData.urun_kodu}
                onChange={handleChange}
                >
                <MenuItem value="GRM23DZ">GRM23DZ</MenuItem>
                <MenuItem value="BNC02CT">BNC02CT</MenuItem>
                <MenuItem value="VNT22KS">VNT22KS</MenuItem>
                </Select>
            </FormControl>
            
            </Box>

            {/* sorun tipi */}
            <FormControl fullWidth>
                <InputLabel id="sorun_tipi">Sorun Tipi</InputLabel>
                <Select
                labelId="sorun_tipi"
                id="sorun_tipi"
                name='sorun_tipi'
                label="sorun_tipi"
                value={uygunsuzlukData.sorun_tipi}
                onChange={handleChange}
                >
                {
                    sorunTipi.map((item)=>(
                        <MenuItem value={item.text}>{item.text}</MenuItem>
                    ))
                }
                
                </Select>
            </FormControl>



              {/* uygunsuz işlem - standart değer */}
            <Box sx={{display:'flex',justifyContent:'space-between',gap:2}}>

            <TextField
            fullWidth
            label="Uygunsuz Deger-İşlem"
            name="uygunsuz_deger"
            id="uygunsuz_deger"
            type="text"
            variant="outlined"
            sx={{overflow:'flo'}}
            value={uygunsuzlukData.uygunsuz_deger}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Standart Değer Aralığı"
            name="standart_deger"
            id="standart_deger"
            type="text"
            variant="outlined"
            value={uygunsuzlukData.standart_deger}
            onChange={handleChange}
            />

            </Box>


            



              {/* aksiyon sahibi */}
            <FormControl fullWidth>
                <InputLabel id="aksiyon_sahibi">Aksiyon Sahibi Bölüm</InputLabel>
                <Select
                labelId="aksiyon_sahibi"
                id="aksiyon_sahibi"
                name='aksiyon_sahibi'
                label="aksiyon_sahibi"
                value={uygunsuzlukData.aksiyon_sahibi}
                onChange={handleChange}
                >
                {
                    aksiyonSahibi.map((item)=>(
                        <MenuItem value={item.text}>{item.text}</MenuItem>
                    ))
                }
                
                </Select>
            </FormControl>

            <Textarea
            name='aciklama'
            fullWidth
            placeholder='Açıklama'
            minRows={3}
            maxRows={3}
            sx={{overflow:'auto'}}
            value={uygunsuzlukData?.aciklama}
            onChange={handleChange}
            />

            <Textarea
            name='aksiyon'
            fullWidth
            placeholder='Aksiyon'
            minRows={3}
            maxRows={3}
            sx={{overflow:'auto'}}
            value={uygunsuzlukData.aksiyon}
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

export default UygunsuzlukModal