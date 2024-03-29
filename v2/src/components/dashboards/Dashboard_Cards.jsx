import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { detailButtonStyle, paperDashboardStyle_ProsesPlan, paperDashboardStyle_ToplamKontrolEdilen, paperDashboardStyle_ToplamUygunsuzluk } from '../../styles/globalStyle';
import { colors } from "../../styles/globalStyle"


const typoStyle = {
    fontSize: '15px',
    color: '#ffffff',
    fontWeight: '700',
}



const Dashboard_Cards = ({ dashboardData, prosesPlanaUygunluk }) => {


    return (


        <Box mb={3}>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>


                <Grid>
                    <Paper sx={paperDashboardStyle_ProsesPlan}>
                        <Typography sx={typoStyle}>
                            Proses Planı Uygunsuzluk
                        </Typography>
                        <Typography variant="h3" align='center' color={colors.beyaz}>
                            {prosesPlanaUygunluk} %
                        </Typography>
                    </Paper>
                </Grid>

                <Grid>
                    <Paper sx={paperDashboardStyle_ToplamUygunsuzluk}>
                        <Typography sx={typoStyle}>
                            Toplam Uygunsuzluk Miktar
                        </Typography>
                        <Typography variant="h3" align='center' color={colors.beyaz}>
                            {dashboardData.toplamUygunsuzlukMiktar}
                        </Typography>

                        {/* <Button color='inherit' size='small' sx={{textTransform:'none'}} variant='contained' onClick={() => navigate('/proses/uygunsuzluk')}>Detay</Button> */}

                    </Paper>
                </Grid>

                <Grid>
                    <Paper sx={paperDashboardStyle_ToplamKontrolEdilen}>
                        <Typography sx={typoStyle}>
                            Toplam Kontrol Edilen Miktar
                        </Typography>
                        <Typography variant="h3" align='center' color={colors.beyaz}>
                            {dashboardData.toplamKontrolMiktar}
                        </Typography>
                    </Paper>
                </Grid>




            </Box>



        </Box>


    )
}

export default Dashboard_Cards