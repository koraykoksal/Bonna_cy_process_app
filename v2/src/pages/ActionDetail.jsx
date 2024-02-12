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
import { ResponsiveContainer } from 'recharts'


const typoStyle = {
    fontSize: '15px',
    color: '#ffffff',
    fontWeight: '700',
}


const ActionDetail = () => {

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
                percent: (countUygunsuzluk[key] / uygunsuzlukCount.length) * 100
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

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, flexWrap: 'wrap', mt: 5 }}>

                    <Grid>
                        <Paper sx={paperDashboardStyle_ProsesPlan}>
                            <Typography sx={typoStyle}>
                                Proses Planına Uygunluk
                            </Typography>
                            <Typography variant="h3" align='center' color={colors.beyaz}>
                                {state.uygunsuzlukOrani * 100} %
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

                <Box display={'flex'} justifyContent={'center'} gap={5} alignItems={'center'} flexWrap={'wrap'}>

                    <ActionDetail_Tables uygunsuzlukDataTable={uygunsuzlukDataTable} uygunsuzlukCount={uygunsuzlukCount} />

                    <GraphicChart uygunsuzlukDataTable={uygunsuzlukDataTable} uygunsuzlukCount={uygunsuzlukCount} />

                </Box>


            </Box>

        </div>
    )
}

export default ActionDetail