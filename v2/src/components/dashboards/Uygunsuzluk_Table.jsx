import React from 'react'
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { detailButtonStyle } from '../../styles/globalStyle';
import DetailModal from '../detailModals/DetailModal';
import { useSelector } from 'react-redux';


const tableCellStyle = {
    color: '#ffffff',
    fontWeight: '700'
}

const tableContainerStyle = {
    maxHeight: '350px',
    overflow: 'auto',
    width:'700px'
}


const Uygunsuzluk_Table = ({ tekrarlananAksyionTipleri, tekrarlananSorunTipleri }) => {

    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3, mt: 5 }}>

            <TableContainer component={Paper} sx={tableContainerStyle}>
                <Table  size="small" aria-label="a dense table">
                    <TableHead sx={{ backgroundColor: '#000000' }}>
                        <TableRow>
                            <TableCell align='center' sx={tableCellStyle}>Hata Tipi</TableCell>
                            <TableCell align="center" sx={tableCellStyle}>Adet</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tekrarlananSorunTipleri.map((item, index) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell align="center">{item.soruntipi}</TableCell>
                                <TableCell align="center">{item.tekrar}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>




            <TableContainer component={Paper} sx={tableContainerStyle}>
                <Table size="small" aria-label="a dense table">
                    <TableHead sx={{ backgroundColor: '#000000' }}>
                        <TableRow>
                            <TableCell align='center' sx={tableCellStyle}>Hata Tipi</TableCell>
                            <TableCell align="center" sx={tableCellStyle}>Adet</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tekrarlananAksyionTipleri.map((item, index) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell align="center">{item.aksiyontipi}</TableCell>
                                <TableCell align="center">{item.tekrar}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </Box>
    )
}

export default Uygunsuzluk_Table