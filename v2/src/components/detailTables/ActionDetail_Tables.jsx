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


    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }


    const handleFind = (title) => {
        //! aksiyon sahibi bilgisinde boşlık karakterini sil ve büyük harfe çevir. State den gelen aksiyonSahibi bilgisi bu şekilde
        if (title) {
            const data = Object.values(uygunsuzlukData).filter(item => item.aksiyon_sahibi.replace(/\s+/g, '').toUpperCase() == state.aksiyonSahibi && item.sorun_tipi == title)

            setDeepData(data)
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

            <DeepDetail_Modal open={open} handleClose={handleClose} state={state} info={info} uygunsuzlukData={uygunsuzlukData} deepData={deepData} />

        </div>
    )
}

export default ActionDetail_Tables