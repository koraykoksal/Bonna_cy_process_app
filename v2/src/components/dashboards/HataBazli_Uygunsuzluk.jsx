import React from 'react'
import useArge from '../../hooks/useArge'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const HataBazli_Uygunsuzluk = () => {

  const navigate = useNavigate()
  const { getFireData } = useArge()
  const { uygunsuzlukData } = useSelector((state) => state.arge)
  const [sorunTipleri, setSorunTipleri] = useState({});
  const [aksiyonSahibi, setaksiyonSahibi] = useState({})
  const [hataBazliUygunsuzlukMiktar, setHataBazliUygunsuzlukMiktar] = useState(0)
  const [bolumBazliUygunsuzlukMiktar, setBolumBazliUygunsuzlukMiktar] = useState(0)


  useEffect(() => {
    getFireData('Uygunsuzluk')

    const data = JSON.stringify(uygunsuzlukData)
    // console.log(data)
  }, [])

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


    //! hata bazlı uygunsuzluk miktar
    const data = Object.keys(sorunTipleri).length
    setHataBazliUygunsuzlukMiktar(data)


  }, [uygunsuzlukData])


  const typoStyle = {
    fontSize: '15px',
    color: '#ffffff',
    fontWeight: '700',
  }
  const buttonStyle = {
    color: '#ffffff',
    fontWeight: '700'
  }



  return (
    <div>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Grid>
            <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '1rem', width: '250px', height: '175px', flexDirection: 'column', backgroundColor: 'error.main' }}>
              <Typography sx={typoStyle}>
                Uygunsuzluk Çeşidi Miktar
              </Typography>
              <Typography variant="h3" align='center'>
                {hataBazliUygunsuzlukMiktar}
              </Typography>
              <Button size="small" variant='outlined' sx={buttonStyle} onClick={() => navigate('/proses/uygunsuzluk')}>Detay</Button>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default HataBazli_Uygunsuzluk