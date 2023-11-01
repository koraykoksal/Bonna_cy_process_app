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

const SirlamaModal=({open,handleClose,workCenterCode, materialCode, designCode})=>{

  // const handleClose = () => setOpen(false);

  const handleChange=(e)=>{
    setnihaiUrunData({...nihaiUrunData,[e.target.name]:e.target.value})
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

  const [nihaiUrunData, setnihaiUrunData] = useState({
    renkKodu:"",
    urun_kodu:"",
    uretimyeri:"",
    yogunluk:"",
    sirSicaklik:"",
    viskozite:"",
    viskozite_v1:"",
    viskozite_v2:"",
    viskozite_v1v2:"",
    tankKazan_KaristirmaHizi:"",
    balerinTurnetHizi:"",
    balerinGobekHizi:"",
    pompaBasinci:"",
    aktifNozulSayisi_alt:"",
    aktifNozulSayisi_ust:"",
    sirGramaji:"",
    sirKalinligi_taban:"",
    sirKalinligi_kenar:"",
    sirKalinligi_orta:"",
    biskuviKontrol:"",
    biskuviSilimi_silimSuyu:"",
    biskuviSilimi_silimSungeri:"",
    biskuviSilimi_urunSilimi:"",
    makineYikanmasi:"",
    manyetikYikanmasi:"",
    kazandaCokme:"",
    receteKontrolu:"",
    ayakSilimi_silimSungeri:"",
    ayakSilimi_urunAyakSilimi:"",
    sirliUrunYuzeyKontrolu:"",
    auraBoyaLekesiKontrol:"",
    auraBeklemeSuresiKontrol:"",
    uygunsuzlukTipi:"",
    aciklama:"",
    operator:"",
    vardiya:getShift(),
    date:currentdate.toString(),
    time:currentTime.toString(),
    kontroleden_kisi:currentUser
  })

  const [newValue, setnewValue] = useState([])

  useEffect(() => {

    //designCode array içinde value bilgileri tek bir array içine alınır
    const data1 = designCode.map(item=>item.DESENKODU)

    //array içindeki bilgileri alfabetik sıraya göre listelenir
    const data2 = data1.sort()

    setnewValue(data2)
    
  }, [designCode])

  console.log(nihaiUrunData)

  return (
    <div>
      
      <Modal
        keepMounted
        open={open}
        onClose={()=>{
          setnihaiUrunData({
            renkKodu:"",
            urun_kodu:"",
            uretimyeri:"",
            yogunluk:"",
            sirSicaklik:"",
            viskozite:"",
            viskozite_v1:"",
            viskozite_v2:"",
            viskozite_v1v2:"",
            tankKazan_KaristirmaHizi:"",
            balerinTurnetHizi:"",
            balerinGobekHizi:"",
            pompaBasinci:"",
            aktifNozulSayisi_alt:"",
            aktifNozulSayisi_ust:"",
            sirGramaji:"",
            sirKalinligi_taban:"",
            sirKalinligi_kenar:"",
            sirKalinligi_orta:"",
            biskuviKontrol:"",
            biskuviSilimi_silimSuyu:"",
            biskuviSilimi_silimSungeri:"",
            biskuviSilimi_urunSilimi:"",
            makineYikanmasi:"",
            manyetikYikanmasi:"",
            kazandaCokme:"",
            receteKontrolu:"",
            ayakSilimi_silimSungeri:"",
            ayakSilimi_urunAyakSilimi:"",
            sirliUrunYuzeyKontrolu:"",
            auraBoyaLekesiKontrol:"",
            auraBeklemeSuresiKontrol:"",
            uygunsuzlukTipi:"",
            aciklama:"",
            operator:"",
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
               Sırlama
            </Typography>

            <IconButton onClick={()=>handleClose()}>
                <HighlightOffIcon sx={{color:'#C70039',fontSize:'28px'}}/>
            </IconButton>
        </Box>
          
            
            <Box sx={{mt:3,display:'flex',flexDirection:'column',gap:2,overflow:'scroll',maxHeight:'600px'}} component='form'>
                

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

              {/* makine */}
            <FormControl fullWidth>
                <InputLabel id="uretimyeri">Üretim Yeri</InputLabel>
                <Select
                labelId="uretimyeri"
                id="uretimyeri"
                name='uretimyeri'
                label="uretimyeri"
                value={nihaiUrunData.uretimyeri}
                onChange={handleChange}
                >
                {
                  workCenterCode?.filter(data=>data.ISMERKEZI.includes('SR')).map(({ISMERKEZI,index})=>(
                    <MenuItem key={index} value={ISMERKEZI}>{ISMERKEZI}</MenuItem>
                  ))
                }
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
                value={nihaiUrunData.urun_kodu}
                onChange={handleChange}
                >
                {
                  materialCode?.map(({MALZEMEKODU,index})=>(
                    <MenuItem key={index} value={MALZEMEKODU}>{MALZEMEKODU}</MenuItem>
                  ))
                }
                </Select>
            </FormControl>

            {/* ürün kodu */}
            <FormControl fullWidth>
                <InputLabel id="renkKodu">Renk Kodu</InputLabel>
                <Select
                labelId="renkKodu"
                id="renkKodu"
                name='renkKodu'
                label="renkKodu"
                value={nihaiUrunData.renkKodu}
                onChange={handleChange}
                >
                {
                  newValue?.map((item,index)=>(
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))
                }
                </Select>
            </FormControl>
            
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            
            <TextField
            fullWidth
            label="Yoğunluk (g/L)"
            name="yogunluk"
            id="yogunluk"
            type="text"
            variant="outlined"
            value={nihaiUrunData.yogunluk}
            onChange={handleChange}
            />


            <TextField
            fullWidth
            label="Sır Sıcaklık (°C)"
            name="sirSicaklik"
            id="sirSicaklik"
            type="text"
            variant="outlined"
            value={nihaiUrunData.sirSicaklik}
            onChange={handleChange}
            />
            </Box>

            <Box>

            <Typography variant='subtitle2' align='center'>
              Viskozite (°G)
            </Typography>
            
            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            <TextField
            fullWidth
            label="V1"
            name="viskozite_v1"
            id="viskozite_v1"
            type="text"
            variant="outlined"
            value={nihaiUrunData.viskozite_v1}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="V2"
            name="viskozite_v2"
            id="viskozite_v2"
            type="text"
            variant="outlined"
            value={nihaiUrunData.viskozite_v2}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Tiksotropi v1-v2"
            name="viskozite_v1v2"
            id="viskozite_v1v2"
            type="text"
            variant="outlined"
            value={nihaiUrunData.viskozite_v1v2}
            onChange={handleChange}
            />
            </Box>
            
            </Box>


            
            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            <TextField
            fullWidth
            label="Viskozite"
            name="viskozite"
            id="viskozite"
            type="text"
            variant="outlined"
            value={nihaiUrunData.viskozite}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Tank Hızı"
            name="tankKazan_KaristirmaHizi"
            id="tankKazan_KaristirmaHizi"
            type="text"
            variant="outlined"
            value={nihaiUrunData.tankKazan_KaristirmaHizi}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Turnet Hızı"
            name="balerinTurnetHizi"
            id="balerinTurnetHizi"
            type="text"
            variant="outlined"
            value={nihaiUrunData.balerinTurnetHizi}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Gobek Hızı"
            name="balerinGobekHizi"
            id="balerinGobekHizi"
            type="text"
            variant="outlined"
            value={nihaiUrunData.balerinGobekHizi}
            onChange={handleChange}
            />
            </Box>
            
            
            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            <TextField
            fullWidth
            label="Pompa Basıncı"
            name="pompaBasinci"
            id="pompaBasinci"
            type="text"
            variant="outlined"
            value={nihaiUrunData.pompaBasinci}
            onChange={handleChange}
            />

          <TextField
            fullWidth
            label="Sır Gramajı"
            name="sirGramaji"
            id="sirGramaji"
            type="text"
            variant="outlined"
            value={nihaiUrunData.sirGramaji}
            onChange={handleChange}
            />

            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>

            <TextField
            fullWidth
            label="Aktif Nozül Alt"
            name="aktifNozulSayisi_alt"
            id="aktifNozulSayisi_alt"
            type="text"
            variant="outlined"
            value={nihaiUrunData.aktifNozulSayisi_alt}
            onChange={handleChange}
            />

          <TextField
            fullWidth
            label="Aktif Nozül Üst"
            name="aktifNozulSayisi_ust"
            id="aktifNozulSayisi_ust"
            type="text"
            variant="outlined"
            value={nihaiUrunData.aktifNozulSayisi_ust}
            onChange={handleChange}
            />

            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            
            <TextField
            fullWidth
            label="Sır Gramajı"
            name="sirGramaji"
            id="sirGramaji"
            type="text"
            variant="outlined"
            value={nihaiUrunData.sirGramaji}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Sır Taban"
            name="sirKalinligi_taban"
            id="sirKalinligi_taban"
            type="text"
            variant="outlined"
            value={nihaiUrunData.sirKalinligi_taban}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Sır Kenar"
            name="sirKalinligi_kenar"
            id="sirKalinligi_kenar"
            type="text"
            variant="outlined"
            value={nihaiUrunData.sirKalinligi_kenar}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Sır Orta"
            name="sirKalinligi_orta"
            id="sirKalinligi_orta"
            type="text"
            variant="outlined"
            value={nihaiUrunData.sirKalinligi_orta}
            onChange={handleChange}
            />

            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            <FormControl fullWidth>
                <InputLabel id="biskuviKontrol">Biskuvi Kontrol</InputLabel>
                <Select
                labelId="biskuviKontrol"
                id="biskuviKontrol"
                name='biskuviKontrol'
                label="biskuviKontrol"
                value={nihaiUrunData.biskuviKontrol}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="biskuviSilimi_silimSuyu">Silim Suyu</InputLabel>
                <Select
                labelId="biskuviSilimi_silimSuyu"
                id="biskuviSilimi_silimSuyu"
                name='biskuviSilimi_silimSuyu'
                label="biskuviSilimi_silimSuyu"
                value={nihaiUrunData.biskuviSilimi_silimSuyu}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="biskuviSilimi_silimSungeri">Silim Süngeri</InputLabel>
                <Select
                labelId="biskuviSilimi_silimSungeri"
                id="biskuviSilimi_silimSungeri"
                name='biskuviSilimi_silimSungeri'
                label="biskuviSilimi_silimSungeri"
                value={nihaiUrunData.biskuviSilimi_silimSungeri}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>

            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            
            <FormControl fullWidth>
                <InputLabel id="biskuviSilimi_urunSilimi">Ürün Silimi</InputLabel>
                <Select
                labelId="biskuviSilimi_urunSilimi"
                id="biskuviSilimi_urunSilimi"
                name='biskuviSilimi_urunSilimi'
                label="biskuviSilimi_urunSilimi"
                value={nihaiUrunData.biskuviSilimi_urunSilimi}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>
            
            <FormControl fullWidth>
                <InputLabel id="makineYikanmasi">Makine Yıkanması</InputLabel>
                <Select
                labelId="makineYikanmasi"
                id="makineYikanmasi"
                name='makineYikanmasi'
                label="makineYikanmasi"
                value={nihaiUrunData.makineYikanmasi}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="manyetikYikanmasi">Manyetik Yıkanması</InputLabel>
                <Select
                labelId="manyetikYikanmasi"
                id="manyetikYikanmasi"
                name='manyetikYikanmasi'
                label="manyetikYikanmasi"
                value={nihaiUrunData.manyetikYikanmasi}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>
            
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            
            <FormControl fullWidth>
                <InputLabel id="kazandaCokme">Kazanda Çökme</InputLabel>
                <Select
                labelId="kazandaCokme"
                id="kazandaCokme"
                name='kazandaCokme'
                label="kazandaCokme"
                value={nihaiUrunData.kazandaCokme}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>
            
            <FormControl fullWidth>
                <InputLabel id="receteKontrolu">Reçete Kontrolü</InputLabel>
                <Select
                labelId="receteKontrolu"
                id="receteKontrolu"
                name='receteKontrolu'
                label="receteKontrolu"
                value={nihaiUrunData.receteKontrolu}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="ayakSilimi_silimSungeri">Sünger Silimi</InputLabel>
                <Select
                labelId="ayakSilimi_silimSungeri"
                id="ayakSilimi_silimSungeri"
                name='ayakSilimi_silimSungeri'
                label="ayakSilimi_silimSungeri"
                value={nihaiUrunData.ayakSilimi_silimSungeri}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>
            
            </Box>
            
            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            <FormControl fullWidth>
                <InputLabel id="ayakSilimi_urunAyakSilimi">Ürün Ayak Silimi</InputLabel>
                <Select
                labelId="ayakSilimi_urunAyakSilimi"
                id="ayakSilimi_urunAyakSilimi"
                name='ayakSilimi_urunAyakSilimi'
                label="ayakSilimi_urunAyakSilimi"
                value={nihaiUrunData.ayakSilimi_urunAyakSilimi}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="sirliUrunYuzeyKontrolu">Sırlı Yüzey Kontrol</InputLabel>
                <Select
                labelId="sirliUrunYuzeyKontrolu"
                id="sirliUrunYuzeyKontrolu"
                name='sirliUrunYuzeyKontrolu'
                label="sirliUrunYuzeyKontrolu"
                value={nihaiUrunData.sirliUrunYuzeyKontrolu}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            <FormControl fullWidth>
                <InputLabel id="auraBoyaLekesiKontrol">Aura Boya Lekesi</InputLabel>
                <Select
                labelId="auraBoyaLekesiKontrol"
                id="auraBoyaLekesiKontrol"
                name='auraBoyaLekesiKontrol'
                label="auraBoyaLekesiKontrol"
                value={nihaiUrunData.auraBoyaLekesiKontrol}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="auraBoyaLekesiKontrol">Auro Bekleme Süresi</InputLabel>
                <Select
                labelId="auraBoyaLekesiKontrol"
                id="auraBoyaLekesiKontrol"
                name='auraBoyaLekesiKontrol'
                label="auraBoyaLekesiKontrol"
                value={nihaiUrunData.auraBoyaLekesiKontrol}
                onChange={handleChange}
                >
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
                </Select>
            </FormControl>
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
            
            <FormControl fullWidth>
                <InputLabel id="uygunsuzlukTipi">Uygunsuzluk Tipi</InputLabel>
                <Select
                labelId="uygunsuzlukTipi"
                id="uygunsuzlukTipi"
                name='uygunsuzlukTipi'
                label="uygunsuzlukTipi"
                value={nihaiUrunData.uygunsuzlukTipi}
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
            value={nihaiUrunData.aciklama}
            onChange={handleChange}
            />

            </Box>


            <TextField
            multiline
            fullWidth
            label="Operatör"
            name="operator"
            id="operator"
            type="text"
            variant="outlined"
            value={nihaiUrunData.operator}
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

export default SirlamaModal