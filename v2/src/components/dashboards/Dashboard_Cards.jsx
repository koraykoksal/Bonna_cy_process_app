import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

const Dashboard_Cards = () => {

    const navigate = useNavigate()

    const { readFireData, getDesenCode, getWorkCenter, getMaterialCenter, hammaddeMaterialCode } = useArge()
    const { dashboardData } = useSelector((state) => state.arge)
    const [detailData, setdetailData] = useState([])
    const [prosesPlanaUygunluk, setprosesPlanaUygunluk] = useState(0)

    const typoStyle = {
        fontSize: '15px',
        color: '#ffffff',
        fontWeight: '700',
    }
    const buttonStyle = {
        color: '#ffffff',
        fontWeight: '700'
    }

    useEffect(() => {

        readFireData()

    }, [])


    useEffect(() => {

        // let toplamKontrolEdilen = []

        // Object.values(dashboardData.toplamKontrolDetay).forEach(item=>{
        //   if(typeof item == 'object' && item !== null ){

        //     const data = Object.keys(item)
        //     toplamKontrolEdilen.push(data)

        //     const toplamKayitSayisi = toplamKontrolEdilen.reduce((toplam, altDizi) => toplam + altDizi.length, 0);

        //     console.log(toplamKayitSayisi)
        //   }

        // })

        const uygunlukOrani = (Number(dashboardData.toplamUygunsuzlukMiktar) / Number(dashboardData.toplamKontrolMiktar)) * 100
        setprosesPlanaUygunluk(uygunlukOrani.toFixed(1))

    }, [dashboardData])


    return (
        <div>
            <Box py={10}>


                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>


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
                            <Button size="small" variant='outlined' sx={buttonStyle} onClick={() => navigate('/proses/uygunsuzluk')}>Detay</Button>
                        </Paper>
                    </Grid>

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


                </Box>



            </Box>

        </div>
    )
}

export default Dashboard_Cards