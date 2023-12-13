import React from 'react'
import Typography from '@mui/material/Typography';
import { typoStyle } from "../styles/globalStyle"
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid, Paper } from '@mui/material';
import Dashboard_Cards from '../components/dashboards/Dashboard_Cards';
import HataBazli_Uygunsuzluk from '../components/dashboards/HataBazli_Uygunsuzluk';
import Uygunsuzluk_Table from '../components/dashboards/Uygunsuzluk_Table';

const Home = () => {


  const navigate = useNavigate()

  const { readFireData, getFireData, getDesenCode, getWorkCenter, getMaterialCenter, hammaddeMaterialCode } = useArge()
  const { dashboardData } = useSelector((state) => state.arge)
  const [prosesPlanaUygunluk, setprosesPlanaUygunluk] = useState(0)

  const { uygunsuzlukData } = useSelector((state) => state.arge)
  const [sorunTipleri, setSorunTipleri] = useState({});
  const [aksiyonSahibi, setaksiyonSahibi] = useState({})
  const [hataBazliUygunsuzlukMiktar, setHataBazliUygunsuzlukMiktar] = useState(0)
  const [bolumBazliUygunsuzlukMiktar, setBolumBazliUygunsuzlukMiktar] = useState(0)




  useEffect(() => {

    readFireData()
    getFireData('Uygunsuzluk')

  }, [])


  useEffect(() => {

    const uygunlukOrani = (Number(dashboardData.toplamUygunsuzlukMiktar) / Number(dashboardData.toplamKontrolMiktar)) * 100
    setprosesPlanaUygunluk(uygunlukOrani.toFixed(1))

  }, [dashboardData])


  useEffect(() => {

    //! hata bazlı uygunsuzluk datası
    Object.values(uygunsuzlukData).forEach(kayit => {
      const sorunTipi = kayit.sorun_tipi || "Değer"

      setSorunTipleri(prevSorunTipleri => ({
        ...prevSorunTipleri, [sorunTipi]: [...(prevSorunTipleri[sorunTipi] || []), kayit]
      }))

    })


    //! bölüm bazlı uygunsuzluk datası
    Object.values(uygunsuzlukData).forEach(kayit => {
      const aksiyon_sahibi = kayit.aksiyon_sahibi || "Değer"

      setaksiyonSahibi(prevSorunTipleri => ({
        ...prevSorunTipleri, [aksiyon_sahibi]: [...(prevSorunTipleri[aksiyon_sahibi] || []), kayit]
      }))
    })

  }, [uygunsuzlukData])


  // useEffect(() => {

  //   Object.values(uygunsuzlukData).forEach(kayit => {
  //     const sorunTipi = kayit.sorun_tipi || "Değer";

  //     setSorunTipleri(prevSorunTipleri => {
  //       // Mevcut kayıtlar ve sayımları için varsayılan değerler
  //       const mevcutKayitlar = prevSorunTipleri[sorunTipi]?.kayitlar || [];
  //       const mevcutSayim = prevSorunTipleri[sorunTipi]?.sayim || 0;

  //       return {
  //         ...prevSorunTipleri,
  //         [sorunTipi]: {
  //           kayitlar: [...mevcutKayitlar, kayit],
  //           sayim: mevcutSayim + 1
  //         }
  //       };
  //     });
  //   });

  // }, [uygunsuzlukData])



  useEffect(() => {

    //! hata bazlı uygunsuzluk miktar
    const sorunTipleri_data = Object.keys(sorunTipleri).length
    setHataBazliUygunsuzlukMiktar(sorunTipleri_data)

    //! bölüm bazlı uygunsuzluk miktar
    const aksiyonSahibi_data = Object.keys(aksiyonSahibi).length
    setBolumBazliUygunsuzlukMiktar(aksiyonSahibi_data)


  }, [sorunTipleri, aksiyonSahibi])








  return (

    <Box pt={8}>

      <Typography align='center' p={2} fontWeight={700} letterSpacing={5} fontSize={22}>Genel Özet</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>

        <Dashboard_Cards dashboardData={dashboardData} prosesPlanaUygunluk={prosesPlanaUygunluk} />
        <HataBazli_Uygunsuzluk hataBazliUygunsuzlukMiktar={hataBazliUygunsuzlukMiktar} bolumBazliUygunsuzlukMiktar={bolumBazliUygunsuzlukMiktar} />

      </Box>

      <Box>
        <Uygunsuzluk_Table sorunTipleri={sorunTipleri} />
      </Box>

    </Box>

  )

}

export default Home