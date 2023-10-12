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

const BiskuviTriyajModal=({open,setOpen,handleOpen})=>{

  const handleClose = () => setOpen(false);

  const handleChange=(e)=>{
    settriyajData({...triyajData,[e.target.name]:e.target.value})
    
  }


  const control=()=>{
    settriyajData(
      
      {...triyajData,
      hataliUrunYuzdesi:(Number(triyajData.hataliUrunSayisi) / Number(triyajData.kontroledilenAdet)).toFixed(2),
      ayakCatlagiYuzdesi:(Number(triyajData.ayakcatlagi) / Number(triyajData.kontroledilenAdet)).toFixed(2),
      kenarCatlagiYuzdesi:(Number(triyajData.kenarCatlagi) / Number(triyajData.kontroledilenAdet)).toFixed(2),
      ayakCatlagiYuzdesi:(Number(triyajData.ayakcatlagi) / Number(triyajData.kontroledilenAdet)).toFixed(2),

      firinKirigiYuzdesi:(Number(triyajData.firinKirigi) / Number(triyajData.kontroledilenAdet)).toFixed(2),
      digerYuzdesi:(Number(triyajData.diger) / Number(triyajData.kontroledilenAdet)).toFixed(2),

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

  const [triyajData, settriyajData] = useState({
    urun_kodu:"",
    sekillendirmeYontemi:"",
    toplamAdet:"",
    kontroledilenAdet:"",
    hataliUrunSayisi:"",
    aciklama:"",
    aksiyon:"",
    karantina:"",
    firinkodu:"",
    biskuvifirinSorumlusu:"",
    ayakcatlagi:0,
    kenarCatlagi:0,
    firinKirigi:0,
    diger:0,
    hataliUrunYuzdesi:0,
    ayakCatlagiYuzdesi:0,
    kenarCatlagiYuzdesi:0,
    firinKirigiYuzdesi:0,
    digerYuzdesi:0,
    vardiya:getShift(),
    date:currentdate.toString(),
    time:currentTime.toString(),
    kontroleden_kisi:currentUser
  })


  useEffect(() => {
    
    control()

  }, [
    triyajData.hataliUrunSayisi,
    triyajData.ayakcatlagi,
    triyajData.kenarCatlagi,
    triyajData.firinKirigi,
    triyajData.diger
    ])
  
 

  console.log(triyajData)

  


  
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
                Biskuvi Triyaj
            </Typography>

            <IconButton onClick={()=>handleClose()}>
                <HighlightOffIcon sx={{color:'#C70039',fontSize:'28px'}}/>
            </IconButton>
        </Box>
          
            
            <Box sx={{mt:3,display:'flex',flexDirection:'column',gap:2,overflow:'scroll',maxHeight:'600px'}} component='form'>
                

            <Box sx={{display:'flex',justifyContent:'space-between',gap:2}}>

            <FormControl fullWidth>
                <InputLabel id="urun_kodu">Ürün Kodu</InputLabel>
                <Select
                labelId="urun_kodu"
                id="urun_kodu"
                name='urun_kodu'
                label="urun_kodu"
                value={triyajData.urun_kodu}
                onChange={handleChange}
                >
                <MenuItem value="GRM23DZ">GRM23DZ</MenuItem>
                <MenuItem value="BNC02CT">BNC02CT</MenuItem>
                <MenuItem value="VNT22KS">VNT22KS</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="sekillendirmeYontemi">Şekillendirme Yöntemi</InputLabel>
                <Select
                labelId="sekillendirmeYontemi"
                id="sekillendirmeYontemi"
                name='sekillendirmeYontemi'
                label="sekillendirmeYontemi"
                value={triyajData.sekillendirmeYontemi}
                onChange={handleChange}
                >
                <MenuItem value="İzo Statik Pres">İzo Statik Pres</MenuItem>
                <MenuItem value="Otomatik Torna">Otomatik Torna</MenuItem>
                </Select>
            </FormControl>

            </Box>
            

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            
            <TextField
            required
            fullWidth
            label="Toplam Adet"
            name="toplamAdet"
            id="toplamAdet"
            type="text"
            variant="outlined"
            value={triyajData.toplamAdet}
            onChange={handleChange}
            />


            <TextField
            required
            fullWidth
            label="Kontrol Edilen"
            name="kontroledilenAdet"
            id="kontroledilenAdet"
            type="text"
            variant="outlined"
            value={triyajData.kontroledilenAdet}
            onChange={handleChange}
            />

            <TextField
            required
            fullWidth
            label="Hatalı Urun"
            name="hataliUrunSayisi"
            id="hataliUrunSayisi"
            type="text"
            variant="outlined"
            value={triyajData.hataliUrunSayisi}
            onChange={handleChange}
            />

            </Box>

            <TextField
            disabled
            fullWidth
            label="Hatalı Ürün Yüzdesi"
            name="hataliUrunYuzdesi"
            id="hataliUrunYuzdesi"
            type="text"
            variant="outlined"
            value={triyajData.hataliUrunYuzdesi}
            onChange={handleChange}
            />


  
            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            
            

              <FormControl fullWidth>
                <InputLabel id="karantina">Karantine Evet/Hayır</InputLabel>
                <Select
                labelId="karantina"
                id="karantina"
                name='karantina'
                label="karantina"
                value={triyajData.karantina}
                onChange={handleChange}
                >
                <MenuItem value="EVET">EVET</MenuItem>
                <MenuItem value="HAYIR">HAYIR</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="firinkodu">Fırın Kodu</InputLabel>
                <Select
                labelId="firinkodu"
                id="firinkodu"
                name='firinkodu'
                label="firinkodu"
                value={triyajData.firinkodu}
                onChange={handleChange}
                >
                <MenuItem value="C600">C600</MenuItem>
                <MenuItem value="C400">C400</MenuItem>
                </Select>
            </FormControl>

            </Box>


            <Box sx={{display:'flex',justifyContent:'space-between',gap:2}}>

            <Textarea
            name='aciklama'
            fullWidth
            placeholder='Açıklama'
            minRows={2}
            maxRows={2}
            sx={{overflow:'auto'}}
            value={triyajData?.aciklama}
            onChange={handleChange}
            />

            <Textarea
            name='aksiyon'
            fullWidth
            placeholder='Aksiyon'
            minRows={2}
            maxRows={2}
            sx={{overflow:'auto'}}
            value={triyajData?.aksiyon}
            onChange={handleChange}
            />
            </Box>

            <TextField
            fullWidth
            label="Biskuvi Fırın Sorumlusu"
            name="biskuvifirinSorumlusu"
            id="biskuvifirinSorumlusu"
            type="text"
            variant="outlined"
            value={triyajData.biskuvifirinSorumlusu}
            onChange={handleChange}
            />

            <Box sx={{display:'flex',justifyContent:'space-between',gap:2}}>
            <TextField
            fullWidth
            label="Ayak Çatlağı"
            name="ayakcatlagi"
            id="ayakcatlagi"
            type="text"
            variant="outlined"
            value={triyajData.ayakcatlagi}
            onChange={handleChange}
            />
            <TextField
            fullWidth
            label="Kenar Çatlağı"
            name="kenarCatlagi"
            id="kenarCatlagi"
            type="text"
            variant="outlined"
            value={triyajData.kenarCatlagi}
            onChange={handleChange}
            />
            <TextField
            fullWidth
            label="Fırın Kırığı"
            name="firinKirigi"
            id="firinKirigi"
            type="text"
            variant="outlined"
            value={triyajData.firinKirigi}
            onChange={handleChange}
            />
            <TextField
            fullWidth
            label="Diğer"
            name="diger"
            id="diger"
            type="text"
            variant="outlined"
            value={triyajData.diger}
            onChange={handleChange}
            />
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            <TextField
            disabled
            fullWidth
            label="Ayak Çatlağı"
            name="ayakcatlagi"
            id="ayakcatlagi"
            type="text"
            variant="outlined"
            value={triyajData.ayakCatlagiYuzdesi}
            onChange={handleChange}
            />
            <TextField
            disabled
            fullWidth
            label="Kenar Çatlağı"
            name="kenarCatlagi"
            id="kenarCatlagi"
            type="text"
            variant="outlined"
            value={triyajData.kenarCatlagiYuzdesi}
            onChange={handleChange}
            />
            <TextField
            disabled
            fullWidth
            label="Fırın Kırığı"
            name="firinKirigi"
            id="firinKirigi"
            type="text"
            variant="outlined"
            value={triyajData.firinKirigiYuzdesi}
            onChange={handleChange}
            />
            <TextField
            disabled
            fullWidth
            label="Diğer"
            name="diger"
            id="diger"
            type="text"
            variant="outlined"
            value={triyajData.digerYuzdesi}
            onChange={handleChange}
            />              
            </Box>
            

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

export default BiskuviTriyajModal