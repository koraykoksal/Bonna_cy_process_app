import React from 'react'
import useArge from '../../hooks/useArge'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { paperDashboardStyle_Uygunsuzluk } from '../../styles/globalStyle'
import { colors } from '../../styles/globalStyle'


const HataBazli_Uygunsuzluk = ({farkliAksiyonTipiSayisi,farkliSorunTipiSayisi}) => {

  const navigate = useNavigate()


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

    <Box >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
        <Grid>
          <Paper sx={paperDashboardStyle_Uygunsuzluk}>
            <Typography sx={typoStyle}>
              Uygunsuzluk Çeşidi Miktar
            </Typography>
            <Typography variant="h3" align='center' color={colors.beyaz}>
              {farkliSorunTipiSayisi}
            </Typography>
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={paperDashboardStyle_Uygunsuzluk}>
            <Typography sx={typoStyle}>
              Bölüm Uygunsuzluk Miktar
            </Typography>
            <Typography variant="h3" align='center' color={colors.beyaz}>
              {farkliAksiyonTipiSayisi}
            </Typography>
          </Paper>
        </Grid>
      </Box>
    </Box>
  )
}

export default HataBazli_Uygunsuzluk