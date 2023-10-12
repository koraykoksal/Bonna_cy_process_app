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

const ManDikTornaPresModal=({open,setOpen,handleOpen})=>{

  const handleClose = () => setOpen(false);

  const handleChange=(e)=>{
    setmandiktornaData({...mandiktornaData,[e.target.name]:e.target.value})
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

  const [mandiktornaData, setmandiktornaData] = useState({
    is_merkezi:"",
    agirlik:"",
    taban:"",
    kenar:"",
    pkenar:"",
    sucukcap:"",
    aynacap:"",
    camursertlik:"",
    catlakkontrol:"",
    rotuskontrol:"",
    yuzeykontrol:"",
    uygunsuzluktipi:"",
    aciklama:"",
    vardiyasorumlusu:"",
    havakontrol:"",
    urun_kodu:"",
    vardiya:getShift(),
    date:currentdate.toString(),
    time:currentTime.toString(),
    kontroleden_kisi:currentUser
  })


  console.log(mandiktornaData)


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
                Man-Dik Torna / Pres
            </Typography>

            <IconButton onClick={()=>handleClose()}>
                <HighlightOffIcon sx={{color:'#C70039',fontSize:'28px'}}/>
            </IconButton>
        </Box>
          
            
            <Box sx={{mt:3,display:'flex',flexDirection:'column',gap:2,overflow:'scroll',maxHeight:'600px'}} component='form'>
                

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

              {/* makine */}
            <FormControl fullWidth>
                <InputLabel id="is_merkezi">Makine</InputLabel>
                <Select
                labelId="is_merkezi"
                id="is_merkezi"
                name='is_merkezi'
                label="is_merkezi"
                value={mandiktornaData.is_merkezi}
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
                value={mandiktornaData.urun_kodu}
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
            label="Ağırlık (gr)"
            name="agirlik"
            id="agirlik"
            type="text"
            variant="outlined"
            
            value={mandiktornaData.agirlik}
            onChange={handleChange}
            />
            <TextField
            fullWidth
            label="Taban (mm) "
            name="taban"
            id="taban"
            type="text"
            variant="outlined"
            
            value={mandiktornaData.taban}
            onChange={handleChange}
            />
            <TextField
            fullWidth
            label="Kenar (mm)"
            name="kenar"
            id="kenar"
            type="text"
            variant="outlined"
            
            value={mandiktornaData.kenar}
            onChange={handleChange}
            />
            <TextField
            fullWidth
            label="Çamur Sertlik"
            name="camursertlik"
            id="camursertlik"
            type="text"
            variant="outlined"
            
            value={mandiktornaData.camursertlik}
            onChange={handleChange}
            />
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            <TextField
            fullWidth
            label="P.Kenar (mm)"
            name="pkenar"
            id="pkenar"
            type="text"
            variant="outlined"
            
            value={mandiktornaData.pkenar}
            onChange={handleChange}
            />
            <TextField
            fullWidth
            label="Sucuk Çap (mm)"
            name="sucukcap"
            id="sucukcap"
            type="text"
            variant="outlined"
            
            value={mandiktornaData.sucukcap}
            onChange={handleChange}
            />
            <TextField
            fullWidth
            label="Ayna Çapı (mm)"
            name="aynacap"
            id="aynacap"
            type="text"
            variant="outlined"
            
            value={mandiktornaData.aynacap}
            onChange={handleChange}
            />
            </Box>


            {/* uygunsuz işlem - standart değer */}
            <Box sx={{display:'flex',justifyContent:'space-between',gap:2}}>

            <FormControl fullWidth>
                <InputLabel id="havakontrol">HK</InputLabel>
                <Select
                labelId="havakontrol"
                id="havakontrol"
                name='havakontrol'
                label="havakontrol"
                value={mandiktornaData.havakontrol}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOK">NOK</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="catlakkontrol">ÇK</InputLabel>
                <Select
                labelId="catlakkontrol"
                id="catlakkontrol"
                name='catlakkontrol'
                label="catlakkontrol"
                value={mandiktornaData.catlakkontrol}
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
                value={mandiktornaData.rotuskontrol}
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
                value={mandiktornaData.yuzeykontrol}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOK">NOK</MenuItem>
                </Select>
            </FormControl>

            </Box>

            {/* aksiyon sahibi */}
            <FormControl fullWidth>
                <InputLabel id="uygunsuzluktipi">Uygunsuzluk Tipi</InputLabel>
                <Select
                labelId="uygunsuzluktipi"
                id="uygunsuzluktipi"
                name='uygunsuzluktipi'
                label="uygunsuzluktipi"
                value={mandiktornaData.uygunsuzluktipi}
                onChange={handleChange}
                >
                {
                    uygunsuzlukTipi.map((item)=>(
                        <MenuItem value={item.text}>{item.text}</MenuItem>
                    ))
                }
                
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
            value={mandiktornaData.aciklama}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Vardiya Sorumlusu veya Operatör"
            name="vardiyasorumlusu"
            id="vardiyasorumlusu"
            type="text"
            variant="outlined"
            
            value={mandiktornaData.vardiyasorumlusu}
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

export default ManDikTornaPresModal