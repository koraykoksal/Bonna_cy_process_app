import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SekillendirmeData, SirlamaData } from '../helpers/ProcessData';
import { HiOutlineSearch } from "react-icons/hi";
import { IoArrowBackCircle } from "react-icons/io5";
import { colors, paperDashboardStyle_ProsesPlan, paperDashboardStyle_ToplamKontrolEdilen, paperDashboardStyle_ToplamUygunsuzluk } from '../styles/globalStyle'
import ActionDetail_Tables from '../components/detailTables/ActionDetail_Tables'
import GraphicChart from '../components/GraphicChart'
import useArge from '../hooks/useArge'



const typoStyle = {
    fontSize: '15px',
    color: '#ffffff',
    fontWeight: '700',
}


const ActionDetail = () => {

    const { readFireData, getFireData } = useArge()
    const { dashboardData, uygunsuzlukData, dbData } = useSelector((state) => state.arge)
    const { state } = useLocation()
    const { id } = useParams()
    const navigate = useNavigate()
    const [allData, setAllData] = useState([])
    const [uygunsuzlukCount, setUygunsuzlukCount] = useState([])
    const [uygunsuzlukDataTable, setuygunsuzlukDataTable] = useState([])


    const [info, setInfo] = useState({
        dateFrom: "",
        dateTo: ""
    })

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        readFireData()
        getFireData('Uygunsuzluk')
    }, [])


    //! useLocation dan gelen değere göre veriyi güncelle
    useEffect(() => {

        let geciciVeriSetleri = [];
        if (state.aksiyonSahibi == "SEKILLENDIRME") {

            SekillendirmeData.forEach(element => {
                if (Object.keys(dbData).includes(element)) {

                    const veriSeti = Object.values(dbData[element])
                    //* Spread operatörü ile veri setini geciciVeriSetleri'ne tek seviyeli olarak ekle
                    geciciVeriSetleri.push(...veriSeti)
                }
            });
        }
        else if (state.aksiyonSahibi == "SIRLAMA") {

            SirlamaData.forEach(element => {
                if (Object.keys(dbData).includes(element)) {

                    const veriSeti = Object.values(dbData[element])
                    //* Spread operatörü ile veri setini geciciVeriSetleri'ne tek seviyeli olarak ekle
                    geciciVeriSetleri.push(...veriSeti)
                }
            });
        }
        else if (state.aksiyonSahibi == "FIRINLAR") {

            Object.keys(dbData).forEach(element => {

                const stateName = 'Triyaj'
                const dbName = element

                if (stateName == dbName) {
                    const veriSeti = Object.values(dbData[element])
                    geciciVeriSetleri.push(...veriSeti)
                }


            })
        }
        else if (state.aksiyonSahibi == "KALITEGUVENCE") {

            Object.keys(dbData).forEach(element => {

                const stateName = 'NihaiUrunKontrol'
                const dbName = element

                if (stateName == dbName) {
                    const veriSeti = Object.values(dbData[element])
                    geciciVeriSetleri.push(...veriSeti)
                }


            })
        }
        else {

            Object.keys(dbData).forEach(element => {

                const stateName = state.aksiyonSahibi.toUpperCase()
                const dbName = element.toUpperCase()

                if (stateName == dbName) {
                    const veriSeti = Object.values(dbData[element])
                    geciciVeriSetleri.push(...veriSeti)
                }
            })
        }

        setAllData(geciciVeriSetleri)

    }, [state])



    //! toplam uygunsuzluk sayısı
    useEffect(() => {

        let uygunsuzluk = []
        const data = Object.values(uygunsuzlukData)

        data.map(item => {

            const { aksiyon_sahibi } = item

            if (state.aksiyonSahibi == aksiyon_sahibi.replace(/\s+/g, '').toUpperCase()) {
                uygunsuzluk.push(item)
            }
        })

        setUygunsuzlukCount(uygunsuzluk)

    }, [state, uygunsuzlukData])



    //! uygunsuzluk açıklaması ve tekrar sayısı
    useEffect(() => {

        const countUygunsuzluk = uygunsuzlukCount.reduce((acc, item) => {
            if (acc[item.sorun_tipi]) {
                acc[item.sorun_tipi]++;
            }
            else {
                acc[item.sorun_tipi] = 1;
            }

            return acc;

        }, {})


        const data = Object.keys(countUygunsuzluk).map(key => {
            return {
                title: key,
                count: countUygunsuzluk[key],
                percent: ((countUygunsuzluk[key] / uygunsuzlukCount.length) * 100).toFixed(2)
            }
        })

        setuygunsuzlukDataTable(data)

    }, [uygunsuzlukCount])





    return (
        <div>

            <Box sx={{ pt: 10 }}>

                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

                    <IoArrowBackCircle size={35} cursor={'pointer'} onClick={() => navigate(-1)} color={colors.siyah} />

                    <Box display={'flex'} justifyContent={'space-between'} gap={2} alignItems={'center'}>

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
                            <HiOutlineSearch size={30} color='black' cursor={'pointer'} style={{ marginLeft: 15 }} />
                        </Box>

                    </Box>

                </Box>

                <Typography align='center' letterSpacing={5} fontWeight={700}>{state.aksiyonSahibi} DETAY</Typography>

                <Box display={'flex'} flexDirection={'column'} gap={5} my={5}>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, flexWrap: 'wrap' }}>

                        <Grid>
                            <Paper sx={paperDashboardStyle_ProsesPlan}>
                                <Typography sx={typoStyle}>
                                    Proses Planına Uygunluk
                                </Typography>
                                <Typography variant="h3" align='center' color={colors.beyaz}>
                                    {state.uygunsuzlukOrani} %
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid>
                            <Paper sx={paperDashboardStyle_ToplamKontrolEdilen}>
                                <Typography sx={typoStyle}>
                                    Toplam Kontrol Edilen Miktar
                                </Typography>
                                <Typography variant="h3" align='center' color={colors.beyaz}>
                                    {allData.length}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid>
                            <Paper sx={paperDashboardStyle_ToplamUygunsuzluk}>
                                <Typography sx={typoStyle}>
                                    Toplam Uygunsuzluk Miktar
                                </Typography>
                                <Typography variant="h3" align='center' color={colors.beyaz}>
                                    {uygunsuzlukCount.length}
                                </Typography>
                            </Paper>
                        </Grid>

                    </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', gap: 5, alignItems: 'center', flexWrap: 'wrap' }} height={500}>

                        <ActionDetail_Tables uygunsuzlukDataTable={uygunsuzlukDataTable} uygunsuzlukCount={uygunsuzlukCount} state={state} />
                        <GraphicChart uygunsuzlukDataTable={uygunsuzlukDataTable} uygunsuzlukCount={uygunsuzlukCount} />

                    </Box>

                </Box>

            </Box>

        </div>
    )
}

export default ActionDetail