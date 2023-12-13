import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

const Dashboard_Cards = ({dashboardData,prosesPlanaUygunluk}) => {

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
   

            <Box mb={3}>


                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>


                <Grid>
                        <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '1rem', width: '250px', height: '175px', flexDirection: 'column', backgroundColor: 'secondary.main' }}>
                            <Typography sx={typoStyle}>
                                Proses Planına Uygunluk
                            </Typography>
                            <Typography variant="h3" align='center'>
                                {prosesPlanaUygunluk} %
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid>
                        <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '1rem', width: '250px', height: '175px', flexDirection: 'column', backgroundColor: 'error.main' }}>
                            <Typography sx={typoStyle}>
                                Toplam Uygunsuzluk Miktar
                            </Typography>
                            <Typography variant="h3" align='center'>
                                {dashboardData.toplamUygunsuzlukMiktar}
                            </Typography>
                            <Button size="small" variant='outlined' sx={buttonStyle} onClick={() => navigate('/proses/uygunsuzluk')}>Detay</Button>
                        </Paper>
                    </Grid>

                    <Grid>
                        <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '1rem', width: '250px', height: '175px', flexDirection: 'column', backgroundColor: 'info.main' }}>
                            <Typography sx={typoStyle}>
                                Toplam Kontrol Edilen Miktar
                            </Typography>
                            <Typography variant="h3" align='center'>
                                {dashboardData.toplamKontrolMiktar}
                            </Typography>
                        </Paper>
                    </Grid>

                    


                </Box>



            </Box>

 
    )
}

export default Dashboard_Cards