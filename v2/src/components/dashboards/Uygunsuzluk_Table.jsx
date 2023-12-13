import React from 'react'
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';


const Uygunsuzluk_Table = ({ tekrarlananAksyionTipleri, tekrarlananSorunTipleri }) => {


    const tableCellStyle = {
        color: '#ffffff',
        fontWeight: '700'
    }




    // console.log(sorunTipleri)

    return (

        <Box sx={{display:'flex',justifyContent:'center',gap:3}}>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
            </Box>

            <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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

        </Box>
    )
}

export default Uygunsuzluk_Table