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

const Home = () => {



  const navigate = useNavigate()

  const { readFireData, getDesenCode, getWorkCenter, getMaterialCenter, hammaddeMaterialCode } = useArge()

  const { dashboardData } = useSelector((state) => state.arge)


  useEffect(() => {

    readFireData()

  }, [])



  return (

    <div>


      <Box py={10}>


        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Card sx={{ maxWidth: 275, textAlign: 'center',backgroundColor:'#bebe' }}>
            <CardContent>
              <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                Toplam Uygunsuzluk Miktarı
              </Typography>
              <Typography variant="h4">
                {dashboardData.toplamUygunsuzlukMiktar}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="small" variant='outlined' onClick={() => navigate('/proses/uygunsuzluk')}>Detay</Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 275, textAlign: 'center',backgroundColor:'#dede'  }}>
            <CardContent>
              <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                Toplam Kontrol Miktarı
              </Typography>
              <Typography variant="h4">
                {dashboardData.toplamKontrolMiktar}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="small" variant='outlined' onClick={() => navigate('/proses/uygunsuzluk')}>Detay</Button>
            </CardActions>
          </Card>

        </Box>



      </Box>


    </div>
  )

}

export default Home