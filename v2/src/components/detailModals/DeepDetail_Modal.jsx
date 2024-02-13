import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FaWindowClose } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SekillendirmeData, SirlamaData } from "../../helpers/ProcessData"
import { Container, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};

const tableCellStyle = {
    color: '#ffffff',
    fontWeight: '700'
}

const tableContainerStyle = {
    maxHeight: '350px',
    overflow: 'auto',
    width: '700px'
}


const DeepDetail_Modal = ({ open, handleClose, uygunsuzlukDataTable, state, info }) => {

    const { dashboardData, uygunsuzlukData, dbData } = useSelector((state) => state.arge)
    const [deepData, setDeepData] = useState([])


    const [filterData, setFilterData] = useState({
        dateFrom: "",
        dateTo: ""
    })

    const handleChange = (e) => {
        setFilterData({ ...filterData, [e.target.name]: e.target.value })
    }

    useEffect(() => {

        if (info) {
            const data = Object.values(uygunsuzlukData).filter(item => item.aksiyon_sahibi == state.aksiyonSahibi && item.sorun_tipi == info)
            setDeepData(data)
        }

    }, [uygunsuzlukDataTable, state, info])


    console.log(deepData)


    return (
        <div>

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>


                    <Box display={'flex'} justifyContent={'space-between'} gap={2} alignItems={'center'}>

                        <FaWindowClose size={30} color='red' cursor={'pointer'} onClick={handleClose} />

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


                    <Typography align='center' fontWeight={700}>{info} Datası</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3, mt: 5 }}>

                        <TableContainer component={Paper} sx={tableContainerStyle}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead sx={{ backgroundColor: '#000000' }}>
                                    <TableRow>
                                        <TableCell align='center' sx={tableCellStyle}>Ürün Kodu</TableCell>
                                        <TableCell align='center' sx={tableCellStyle}>Tarih</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {deepData.map((item, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            <TableCell align="center">{item.urun_kodu}</TableCell>
                                            <TableCell align="center">{item.date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


                    </Box>


                </Box>
            </Modal>

        </div>
    )
}

export default DeepDetail_Modal