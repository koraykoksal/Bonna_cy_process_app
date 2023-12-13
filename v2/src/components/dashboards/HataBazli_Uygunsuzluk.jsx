import React from 'react'
import useArge from '../../hooks/useArge'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const HataBazli_Uygunsuzluk = ({hataBazliUygunsuzlukMiktar,bolumBazliUygunsuzlukMiktar}) => {

  const navigate = useNavigate()
  // const { getFireData } = useArge()
  // const { uygunsuzlukData } = useSelector((state) => state.arge)
  // const [sorunTipleri, setSorunTipleri] = useState({});
  // const [aksiyonSahibi, setaksiyonSahibi] = useState({})
  // const [hataBazliUygunsuzlukMiktar, setHataBazliUygunsuzlukMiktar] = useState(0)
  // const [bolumBazliUygunsuzlukMiktar, setBolumBazliUygunsuzlukMiktar] = useState(0)

  // const [uygunsuzlukDetay, setuygunsuzlukDetay] = useState({})

  const typoStyle = {
    fontSize: '15px',
    color: '#ffffff',
    fontWeight: '700',
  }
  const buttonStyle = {
    color: '#ffffff',
    fontWeight: '700'
  }



  // useEffect(() => {
  //   getFireData('Uygunsuzluk')
  // }, [])



  // useEffect(() => {

  //   //! hata bazlı uygunsuzluk datası
  //   Object.values(uygunsuzlukData).forEach(kayit => {
  //     const sorunTipi = kayit.sorun_tipi || "Değer"

  //     setSorunTipleri(prevSorunTipleri => ({
  //       ...prevSorunTipleri, [sorunTipi]: [...(prevSorunTipleri[sorunTipi] || []), kayit]
  //     }))

  //   })

  //   //! bölüm bazlı uygunsuzluk datası
  //   Object.values(uygunsuzlukData).forEach(kayit => {
  //     const aksiyon_sahibi = kayit.aksiyon_sahibi || "Değer"

  //     setaksiyonSahibi(prevSorunTipleri => ({
  //       ...prevSorunTipleri, [aksiyon_sahibi]: [...(prevSorunTipleri[aksiyon_sahibi] || []), kayit]
  //     }))
  //   })

  // }, [uygunsuzlukData])



  // useEffect(() => {

  //   //! hata bazlı uygunsuzluk miktar
  //   const sorunTipleri_data = Object.keys(sorunTipleri).length
  //   setHataBazliUygunsuzlukMiktar(sorunTipleri_data)

  //   //! bölüm bazlı uygunsuzluk miktar
  //   const aksiyonSahibi_data = Object.keys(aksiyonSahibi).length
  //   setBolumBazliUygunsuzlukMiktar(aksiyonSahibi_data)


  //   const uygunsuzlukAdetCounts = Object.keys(sorunTipleri).reduce((acc, key) => {
  //     acc[key] = sorunTipleri[key].length;
  //     return acc;
  //   }, {});

  //   setuygunsuzlukDetay(uygunsuzlukAdetCounts)

  // }, [sorunTipleri,aksiyonSahibi])




  return (

    <Box >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
        <Grid>
          <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '1rem', width: '250px', height: '175px', flexDirection: 'column', backgroundColor: 'text.secondary' }}>
            <Typography sx={typoStyle}>
              Uygunsuzluk Çeşidi Miktar
            </Typography>
            <Typography variant="h3" align='center'>
              {hataBazliUygunsuzlukMiktar}
            </Typography>
            <Button size="small" variant='outlined' sx={buttonStyle} onClick={() => navigate('/proses/uygunsuzluk')}>Detay</Button>
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '1rem', width: '250px', height: '175px', flexDirection: 'column', backgroundColor: 'text.secondary' }}>
            <Typography sx={typoStyle}>
              Bölüm Uygunsuzluk Miktar
            </Typography>
            <Typography variant="h3" align='center'>
              {bolumBazliUygunsuzlukMiktar}
            </Typography>
            <Button size="small" variant='outlined' sx={buttonStyle} onClick={() => navigate('/proses/uygunsuzluk')}>Detay</Button>
          </Paper>
        </Grid>
      </Box>
    </Box>
  )
}

export default HataBazli_Uygunsuzluk