import React from 'react'
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Uygunsuzluk_Table = ({ sorunTipleri }) => {


    const tableCellStyle = {
        color: '#ffffff',
        fontWeight: '700'
    }

    const [uygunsuzlukAdetDetay, setuygunsuzlukAdetDetay] = useState([])


    useEffect(() => {

        // const uygunsuzlukAdetCounts = Object.keys(sorunTipleri).reduce((acc, key) => {
        //     acc[key] = sorunTipleri[key].length;
        //     return acc;
        // }, {});

         // const dizi = Object.keys(sorunTipleri).map((item)=>({
        //     title:item,
        //     count:uygunsuzlukAdetCounts[item].sayim

        // }))


        // const dizi = Object.keys(sorunTipleri).map(key => ({
        //     title: key,
        //     count: sorunTipleri[key].sayim
        // }));

       

        // setuygunsuzlukAdetDetay(dizi)

    }, [sorunTipleri])


    // console.log(sorunTipleri)

    return (

        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead sx={{ backgroundColor: '#000000' }}>
                        <TableRow>
                            <TableCell align='center' sx={tableCellStyle}>Hata Tipi</TableCell>
                            <TableCell align="center" sx={tableCellStyle}>Adet</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uygunsuzlukAdetDetay.map((item, index) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell align="center">{item.title}</TableCell>
                                <TableCell align="center">{item.count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Uygunsuzluk_Table