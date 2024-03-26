import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import GraphicChart from '../GraphicChart';
import DeepDetail_Modal from '../detailModals/DeepDetail_Modal';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const tableCellStyle = {
    color: '#ffffff',
    fontWeight: '700'
}

const tableContainerStyle = {
    maxHeight: '350px',
    overflow: 'auto',
    width: '700px'
}


const ActionDetail_Tables = ({ uygunsuzlukDataTable, uygunsuzlukCount, state }) => {

    const { uygunsuzlukData, dbData } = useSelector((state) => state.arge)
    const [info, setInfo] = useState("")
    const [deepData, setDeepData] = useState([])
    const [graphicDataInfo, setGraphicDataInfo] = useState([])
    const dates = JSON.parse(localStorage.getItem('lastSelectedDate'))
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }



    function formatDate2(dateString) {
        const parts = dateString.split('-')
        return `${parts[2]}-${parts[1]}-${parts[0]}`
    }


    function formatDate(dateStr) {

        if (!dateStr) {
            return
        }
        // Tarih stringini parçalara ayır
        const parts = dateStr.split("-");

        // Gün, ay ve yıl için parçaları al
        let day = parts[0];
        let month = parts[1];
        let year = parts[2];

        // Gün ve ay tek haneli ise başına sıfır ekle
        day = day.length === 1 ? `0${day}` : day;
        month = month.length === 1 ? `0${month}` : month;

        // yyyy-mm-dd formatına dönüştür
        return `${day}-${month}-${year}`;
    }


    const handleFind = (title) => {
        //! aksiyon sahibi bilgisinde boşlık karakterini sil ve büyük harfe çevir. State den gelen aksiyonSahibi bilgisi bu şekilde
        // if (title) {

        //     const data = Object.values(uygunsuzlukData).filter(item => item.aksiyon_sahibi.replace(/\s+/g, '').toUpperCase() == state.aksiyonSahibi && item.sorun_tipi == title)


        //     const d1 = uygunsuzlukDataTable.filter(item => item.title == title).map(data => data.count)

        //     const graphicdata = data.reduce((acc, item) => {

        //         if (item.aksiyon_sahibi == "SEKILLENDIRME") {

        //             if (acc[item.urun_kodu]) {
        //                 acc[item.urun_kodu]++;
        //             }
        //             else {
        //                 acc[item.urun_kodu] = 1;
        //             }

        //             return acc;
        //         }
        //         else if (item.aksiyon_sahibi == "SIRLAMA") {

        //             if (acc[item.is_merkezi]) {
        //                 acc[item.is_merkezi]++;
        //             }
        //             else {
        //                 acc[item.is_merkezi] = 1;
        //             }

        //             return acc;
        //         }
        //         else if (item.aksiyon_sahibi == "DIJITAL LOGO") {

        //             if (acc[item.urun_kodu]) {
        //                 acc[item.urun_kodu]++;
        //             }
        //             else {
        //                 acc[item.urun_kodu] = 1;
        //             }

        //             return acc;
        //         }
        //         else if (item.aksiyon_sahibi == "DIJITAL BASKI") {

        //             if (acc[item.urun_kodu]) {
        //                 acc[item.urun_kodu]++;
        //             }
        //             else {
        //                 acc[item.urun_kodu] = 1;
        //             }

        //             return acc;
        //         }
        //         else if (item.aksiyon_sahibi == "AYAKTASLAMA") {

        //             if (acc[item.urun_kodu]) {
        //                 acc[item.urun_kodu]++;
        //             }
        //             else {
        //                 acc[item.urun_kodu] = 1;
        //             }

        //             return acc;
        //         }
        //         else if (item.aksiyon_sahibi == "KALITE GUVENCE") {

        //             if (acc[item.urun_kodu]) {
        //                 acc[item.urun_kodu]++;
        //             }
        //             else {
        //                 acc[item.urun_kodu] = 1;
        //             }

        //             return acc;
        //         }
        //         else if (item.aksiyon_sahibi == "FIRINLAR") {

        //             if (acc[item.urun_kodu]) {
        //                 acc[item.urun_kodu]++;
        //             }
        //             else {
        //                 acc[item.urun_kodu] = 1;
        //             }

        //             return acc;
        //         }
        //         else if (item.aksiyon_sahibi == "DEKORLAMA") {

        //             if (acc[item.renk_kodu]) {
        //                 acc[item.renk_kodu]++;
        //             }
        //             else {
        //                 acc[item.renk_kodu] = 1;
        //             }

        //             return acc;
        //         }
        //         else if (item.aksiyon_sahibi == "HAMMADDE") {

        //             if (acc[item.is_merkezi]) {
        //                 acc[item.is_merkezi]++;
        //             }
        //             else {
        //                 acc[item.is_merkezi] = 1;
        //             }

        //             return acc;
        //         }

        //     }, {})



        //     const deger = Object.keys(graphicdata).map(key => {
        //         return {
        //             title: key,
        //             count: graphicdata[key],
        //             sorunTipiAdet: d1[0],
        //             percent: (Number(graphicdata[key]) / Number(d1[0]) * 100).toFixed(2)
        //         }
        //     })

        //     setGraphicDataInfo(deger)
        //     setDeepData(data)

        // }

        if (title) {
            //! deep detay sayfasında local storage de tarih bilgisi varsa var olan tarih bilgisine göre filtreleme yap yoksa var olan data kaydına göre filtreleme yap
            // const filteredData = Object.values(uygunsuzlukData).filter(item =>
            //     item.aksiyon_sahibi.replace(/\s+/g, '').toUpperCase() === state.aksiyonSahibi &&
            //     item.sorun_tipi === title
            // );

            const filteredData = Object.values(uygunsuzlukData).filter(item => {
                // Aksiyon sahibi ve sorun tipi filtresi
                const actionSahibiMatch = item.aksiyon_sahibi.replace(/\s+/g, '').toUpperCase() === state.aksiyonSahibi;
                const sorunTipiMatch = item.sorun_tipi === title;

                // Eğer dates bilgisi varsa ve geçerliyse, ek olarak tarih filtresi de uygula
                if (dates && dates.dateFrom && dates.dateTo) {
                    // date bilgileri aynı formatta olması için convert işlemi yapıldı.
                    const itemDate = formatDate(item.date); // item.date'yi Date objesine dönüştür
                    const dateFrom = formatDate2(dates.dateFrom);
                    const dateTo = formatDate2(dates.dateTo);

                    // Tarih aralığı filtresi (item.date, dateFrom ve dateTo aralığında olmalı)
                    const isWithinDateRange = itemDate >= dateFrom && itemDate <= dateTo;

                    return actionSahibiMatch && sorunTipiMatch && isWithinDateRange;
                }

                // Eğer dates bilgisi yoksa veya geçersizse, sadece aksiyon sahibi ve sorun tipi filtresini uygula
                return actionSahibiMatch && sorunTipiMatch;
            });

            const totalCount = uygunsuzlukDataTable.find(item => item.title === title)?.count || 0;

            const keyMappings = {
                SEKILLENDIRME: "urun_kodu",
                SIRLAMA: "is_merkezi",
                // Diğer aksiyon sahipleri için benzer eşlemeler...
                DEKORLAMA: "renk_kodu",
                HAMMADDE: "is_merkezi",
                // Varsayılan eşleme
                default: "urun_kodu"
            };

            const graphicdata = filteredData.reduce((acc, item) => {
                const key = keyMappings[item.aksiyon_sahibi] || keyMappings.default;
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {});

            const deger = Object.keys(graphicdata).map(key => ({
                title: key,
                count: graphicdata[key],
                sorunTipiAdet: totalCount,
                percent: ((graphicdata[key] / totalCount) * 100).toFixed(2)
            }));

            setGraphicDataInfo(deger);
            setDeepData(filteredData);
        }


    }



    return (
        <div>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>

                <TableContainer component={Paper} sx={tableContainerStyle}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead sx={{ backgroundColor: '#000000' }}>
                            <TableRow>
                                <TableCell align='center' sx={tableCellStyle}>Hata Tipi</TableCell>
                                <TableCell align="center" sx={tableCellStyle}>Adet</TableCell>
                                <TableCell align="center" sx={tableCellStyle}>Etki Yüzdesi</TableCell>
                                <TableCell align="center" sx={tableCellStyle}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {uygunsuzlukDataTable?.map((item, index) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell align="center">{item.title}</TableCell>
                                    <TableCell align="center">{item.count}</TableCell>
                                    <TableCell align="center">{item.percent} %</TableCell>
                                    <TableCell align="center">
                                        <Button variant='contained' color='info' sx={{ textTransform: 'none' }} onClick={() => {
                                            setInfo(item.title)
                                            handleFind(item.title)
                                            handleOpen()
                                        }}>Detay</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </Box>

            <DeepDetail_Modal open={open} handleClose={handleClose} state={state} info={info} uygunsuzlukData={uygunsuzlukData} deepData={deepData} graphicDataInfo={graphicDataInfo} />

        </div>
    )
}

export default ActionDetail_Tables