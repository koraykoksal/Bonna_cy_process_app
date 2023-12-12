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

const Home = () => {


  const { readFireData, getDesenCode, getWorkCenter, getMaterialCenter, hammaddeMaterialCode } = useArge()
  const { dashboardData } = useSelector((state) => state.arge)
  const [detailData, setdetailData] = useState([])
  const [prosesPlanaUygunluk, setprosesPlanaUygunluk] = useState(0)





  return (

    <Box pt={8}>

      <Typography align='center' p={2} fontWeight={700} letterSpacing={5} fontSize={22}>Genel Özet</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>

        <Dashboard_Cards />
        <HataBazli_Uygunsuzluk />

      </Box>

    </Box>

  )

}

export default Home