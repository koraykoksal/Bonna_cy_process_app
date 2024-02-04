import React from 'react'
import Typography from '@mui/material/Typography';
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid, Paper, TextField } from '@mui/material';
import Dashboard_Cards from '../components/dashboards/Dashboard_Cards';
import HataBazli_Uygunsuzluk from '../components/dashboards/HataBazli_Uygunsuzluk';
import Uygunsuzluk_Table from '../components/dashboards/Uygunsuzluk_Table';
import { HiOutlineSearch } from "react-icons/hi";
import { homePattern } from '../styles/globalStyle';
import bg1 from "../assets/img/bg1.jpeg"


const Home = () => {


  const navigate = useNavigate()

  const { readFireData, getFireData, getDesenCode, getWorkCenter, getMaterialCenter, hammaddeMaterialCode } = useArge()
  const { dashboardData, uygunsuzlukData } = useSelector((state) => state.arge)

  const [prosesPlanaUygunluk, setprosesPlanaUygunluk] = useState(0)

  const [sorunTipleri, setSorunTipleri] = useState({});
  const [aksiyonSahibi, setaksiyonSahibi] = useState({})

  const [hataBazliUygunsuzlukMiktar, setHataBazliUygunsuzlukMiktar] = useState(0)
  const [bolumBazliUygunsuzlukMiktar, setBolumBazliUygunsuzlukMiktar] = useState(0)

  const [farkliSorunTipiSayisi, setFarkliSorunTipiSayisi] = useState(0);
  const [tekrarlananSorunTipleri, setTekrarlananSorunTipleri] = useState([]);


  const [farkliAksiyonTipiSayisi, setFarkliAksiyonTipiSayisi] = useState(0);
  const [tekrarlananAksyionTipleri, setTekrarlananAksiyonTipleri] = useState([]);

  const [info, setInfo] = useState({
    dateFrom: "",
    dateTo: ""
  })

  useEffect(() => {

    readFireData()
    getFireData('Uygunsuzluk')

  }, [])


  //! dashboard datası true ise uygunsuzluk oranı hesaplamasını yap
  useEffect(() => {

    const uygunlukOrani = (Number(dashboardData.toplamUygunsuzlukMiktar) / Number(dashboardData.toplamKontrolMiktar)) * 100
    setprosesPlanaUygunluk(uygunlukOrani.toFixed(1))

  }, [dashboardData])



  useEffect(() => {

    const data = Object.values(uygunsuzlukData)

    //! sorun tiplerini ayrıştır
    const sorunTipleriDizisi = data.map(kayit => kayit.sorun_tipi);
    setSorunTipleri(sorunTipleriDizisi);

    const benzersizSorunTipleri = new Set(sorunTipleriDizisi);
    setFarkliSorunTipiSayisi(benzersizSorunTipleri.size);


    // //! aksiyon sahibi tiplerini ayrıştır
    const aksiyonSahibiTipleriDizisi = data.map(kayit => kayit.aksiyon_sahibi);
    setaksiyonSahibi(aksiyonSahibiTipleriDizisi)

    const benzersizAksiyonTipleri = new Set(aksiyonSahibiTipleriDizisi)
    setFarkliAksiyonTipiSayisi(benzersizAksiyonTipleri.size)


    //! Sorun tiplerinin tekrar sayılarını hesaplama
    const sorunTipiSayilari = {};
    sorunTipleriDizisi.forEach(sorunTipi => {
      sorunTipiSayilari[sorunTipi] = (sorunTipiSayilari[sorunTipi] || 0) + 1;
    });

    //! İstenen formatta tekrarlanan sorun tiplerini ayarlama
    const tekrarlananSorunTipleri = Object.keys(sorunTipiSayilari).map(key => ({
      soruntipi: key,
      tekrar: sorunTipiSayilari[key]
    }));
    setTekrarlananSorunTipleri(tekrarlananSorunTipleri);



    // //! aksiyon sahibi tiplerinin tekrar sayılarını hesaplama
    const aksiyonSahibiTipiSayilari = {};
    aksiyonSahibiTipleriDizisi.forEach(aksiyonTipi => {
      aksiyonSahibiTipiSayilari[aksiyonTipi] = (aksiyonSahibiTipiSayilari[aksiyonTipi] || 0) + 1;
    });

    // //! İstenen formatta tekrarlanan sorun tiplerini ayarlama
    const tekrarlananAksiyonTipleri = Object.keys(aksiyonSahibiTipiSayilari).map(key => ({
      aksiyontipi: key,
      tekrar: aksiyonSahibiTipiSayilari[key]
    }));
    setTekrarlananAksiyonTipleri(tekrarlananAksiyonTipleri);


  }, [uygunsuzlukData])


  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }




  return (




    <Box pt={6}>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, alignItems: 'center', p: 2 }}>
        <Typography>From</Typography>
        <TextField
          id='dateFrom'
          name='dateFrom'
          type='date'
          onChange={handleChange}
        />

        <Typography>To</Typography>
        <TextField
          id='dateTo'
          name='dateTo'
          type='date'
          onChange={handleChange}
        />
        <HiOutlineSearch size={30} cursor={'pointer'} style={{ marginLeft: 15 }} />
      </Box>

      <Typography align='center' p={2} fontWeight={700} letterSpacing={5} fontSize={18}>Genel Özet</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>

        <Dashboard_Cards dashboardData={dashboardData} prosesPlanaUygunluk={prosesPlanaUygunluk} />
        <HataBazli_Uygunsuzluk farkliSorunTipiSayisi={farkliSorunTipiSayisi} farkliAksiyonTipiSayisi={farkliAksiyonTipiSayisi} />

      </Box>

      <Box>
        <Uygunsuzluk_Table tekrarlananAksyionTipleri={tekrarlananAksyionTipleri} tekrarlananSorunTipleri={tekrarlananSorunTipleri} />
      </Box>

    </Box>


  )

}

export default Home