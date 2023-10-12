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

const DijitalBaskiModal=({open,setOpen,handleOpen})=>{

  const handleClose = () => setOpen(false);

  const handleChange=(e)=>{
    setdijitalBaskiData({...dijitalBaskiData,[e.target.name]:e.target.value})
    
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

  const [dijitalBaskiData, setdijitalBaskiData] = useState({
    urun_kodu:"",
    banthizi:"",
    voltaj:"",
    basinc:"",
    mavi:"",
    pembe:"",
    sari:"",
    kahverengi:"",
    yesil:"",
    siyah:"",
    reaktif:"",
    beyaz:"",
    desenGorseli:"",
    hataTanimi:"",
    aciklama:"",

    vardiya:getShift(),
    date:currentdate.toString(),
    time:currentTime.toString(),
    kontroleden_kisi:currentUser
  })


  console.log(dijitalBaskiData)


  
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
                Dijital Baskı
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
                value={dijitalBaskiData.urun_kodu}
                onChange={handleChange}
                >
                <MenuItem value="GRM23DZ">GRM23DZ</MenuItem>
                <MenuItem value="BNC02CT">BNC02CT</MenuItem>
                <MenuItem value="VNT22KS">VNT22KS</MenuItem>
                </Select>
            </FormControl>


            </Box>
            


  
            <Box sx={{display:'flex',justifyContent:'center',gap:2,overflow:'scroll',maxHeight:'600px'}}>

              <FormControl fullWidth>
                <InputLabel id="banthizi">Bant Hızı</InputLabel>
                <Select
                labelId="banthizi"
                id="banthizi"
                name='banthizi'
                label="banthizi"
                value={dijitalBaskiData.banthizi}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="silimsvoltajuyu">Voltaj</InputLabel>
                <Select
                labelId="voltaj"
                id="voltaj"
                name='voltaj'
                label="voltaj"
                value={dijitalBaskiData.voltaj}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="basinc">Basınç</InputLabel>
                <Select
                labelId="basinc"
                id="basinc"
                name='basinc'
                label="basinc"
                value={dijitalBaskiData.basinc}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>

            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            <TextField
            sx={{backgroundColor:'#78C1F3',label:{color:'#000000'}}}
            fullWidth
            label="Mavi"
            name="mavi"
            id="mavi"
            type="text"
            variant="outlined"
            value={dijitalBaskiData.mavi}
            onChange={handleChange}
            />

            <TextField
            sx={{backgroundColor:'#EDB7ED',label:{color:'#000000'}}}
            fullWidth
            label="Pembe"
            name="pembe"
            id="pembe"
            type="text"
            variant="outlined"
            value={dijitalBaskiData.pembe}
            onChange={handleChange}
            />

            <TextField
            sx={{backgroundColor:'#F2F7A1',label:{color:'#000000'}}}
            fullWidth
            label="Sarı"
            name="sari"
            id="sari"
            type="text"
            variant="outlined"
            value={dijitalBaskiData.sari}
            onChange={handleChange}
            />


            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            <TextField
            sx={{backgroundColor:'#DFA878',label:{color:'#000000'}}}
            fullWidth
            label="Kahverengi"
            name="kahverengi"
            id="kahverengi"
            type="text"
            variant="outlined"
            value={dijitalBaskiData.kahverengi}
            onChange={handleChange}
            />

            <TextField
            sx={{backgroundColor:'#A2C579',label:{color:'#000000'}}}
            fullWidth
            label="Yeşil"
            name="yesil"
            id="yesil"
            type="text"
            variant="outlined"
            value={dijitalBaskiData.yesil}
            onChange={handleChange}
            />

            <TextField
            sx={{backgroundColor:'#61677A',label:{color:'#000000'}}}
            fullWidth
            label="Siyah"
            name="siyah"
            id="siyah"
            type="text"
            variant="outlined"
            value={dijitalBaskiData.siyah}
            onChange={handleChange}
            />


            </Box>


            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            <TextField
            fullWidth
            label="Reaktif"
            name="reaktif"
            id="reaktif"
            type="text"
            variant="outlined"
            value={dijitalBaskiData.reaktif}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Beyaz"
            name="beyaz"
            id="beyaz"
            type="text"
            variant="outlined"
            value={dijitalBaskiData.beyaz}
            onChange={handleChange}
            />

            <FormControl fullWidth>
                <InputLabel id="desenGorseli">Görsel</InputLabel>
                <Select
                labelId="desenGorseli"
                id="desenGorseli"
                name='desenGorseli'
                label="desenGorseli"
                value={dijitalBaskiData.desenGorseli}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>



            </Box>


            <TextField
            multiline
            fullWidth
            label="Hata Tanımı"
            name="hataTanimi"
            id="hataTanimi"
            type="text"
            variant="outlined"
            value={dijitalBaskiData.hataTanimi}
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
            value={dijitalBaskiData.aciklama}
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

export default DijitalBaskiModal