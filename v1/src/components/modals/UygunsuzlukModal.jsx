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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

const UygunsuzlukModal=({open,setOpen,handleOpen})=>{

  const handleClose = () => setOpen(false);


  

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
          
        
           <Formik>
            
            <Box sx={{mt:3,display:'flex',flexDirection:'column',gap:2}} component='form'>
                

            {/* <div style={{display:'flex',gap:3}}>
            <TextField
            sx={{width:'200px'}}
            name="date"
            id="date"
            type="date"
            />

            <FormControl sx={{width:'180px'}}>
                <InputLabel id="vardiya">Vardiya</InputLabel>
                <Select
                labelId="vardiya"
                id="vardiya"
                name='vardiya'
                label="vardiya"
                >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                </Select>
            </FormControl>
            </div> */}

            <FormControl fullWidth>
                <InputLabel id="is_merkezi">Makine</InputLabel>
                <Select
                labelId="is_merkezi"
                id="is_merkezi"
                name='is_merkezi'
                label="is_merkezi"
                >
                <MenuItem value={1}>SK-KP1</MenuItem>
                <MenuItem value={2}>SK-KP2</MenuItem>
                <MenuItem value={3}>SK-KP3</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="renk_kodu">Renk Kodu</InputLabel>
                <Select
                labelId="renk_kodu"
                id="renk_kodu"
                name='renk_kodu'
                label="renk_kodu"
                >
                <MenuItem value={1}>ASC</MenuItem>
                <MenuItem value={2}>ASD</MenuItem>
                <MenuItem value={3}>ASF</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="urun_kodu">Ürün Kodu</InputLabel>
                <Select
                labelId="urun_kodu"
                id="urun_kodu"
                name='urun_kodu'
                label="urun_kodu"
                >
                <MenuItem value={1}>GRM23DZ</MenuItem>
                <MenuItem value={2}>BNC02CT</MenuItem>
                <MenuItem value={3}>VNT22KS</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="urun_kodu">Sorun Tipi</InputLabel>
                <Select
                labelId="sorun_tipi"
                id="sorun_tipi"
                name='sorun_tipi'
                label="sorun_tipi"
                >
                {
                    sorunTipi.map((item)=>(
                        <MenuItem value={item.text}>{item.text}</MenuItem>
                    ))
                }
                
                </Select>
            </FormControl>

            <TextField
            fullWidth
            label="Uygunsuz Deger-İşlem"
            name="uygunsuz_deger"
            id="uygunsuz_deger"
            type="text"
            variant="outlined"
            sx={{overflow:'flo'}}
            />

            <TextField
            fullWidth
            label="Standart Değer Aralığı"
            name="standart_deger"
            id="standart_deger"
            type="text"
            variant="outlined"
            />

            <FormControl fullWidth>
                <InputLabel id="aksiyon_sahibi">Aksiyon Sahibi Bölüm</InputLabel>
                <Select
                labelId="aksiyon_sahibi"
                id="aksiyon_sahibi"
                name='aksiyon_sahibi'
                label="aksiyon_sahibi"
                >
                {
                    aksiyonSahibi.map((item)=>(
                        <MenuItem value={item.text}>{item.text}</MenuItem>
                    ))
                }
                
                </Select>
            </FormControl>

            <Textarea
            fullWidth
            placeholder='Açıklama'
            minRows={3}
            maxRows={3}
            sx={{overflow:'auto'}}
            />

            <Textarea
            fullWidth
            placeholder='Aksiyon'
            minRows={3}
            maxRows={3}
            sx={{overflow:'auto'}}
            />

            <Button
            variant='contained'
            fullWidth
            type='submit'
            >
                Save
            </Button>


            </Box>

           </Formik>

          
        </Box>
      </Modal>
    </div>
  );
}

export default UygunsuzlukModal