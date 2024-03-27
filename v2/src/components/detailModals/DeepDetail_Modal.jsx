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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Rectangle } from 'recharts';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    overflow: 'scroll',
    maxHeight: '90%',
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
    width: '100%'
}


const DeepDetail_Modal = ({ open, handleClose, state, info, uygunsuzlukData, deepData, graphicDataInfo }) => {

    const [shortData, setShortData] = useState([])

    useEffect(() => {

        const sortDataResult = deepData.sort((a, b) => {
            const convertDateTime = (date, time) => {
                if (!date || !time) {
                    // Eğer date veya time undefined veya boş string ise, geçerli bir tarih döndürmeyebilir.
                    // Bu durumu ele almak için bir alternatif dönüş değeri sağlayabilirsiniz.
                    // Örneğin, çok geçmiş veya gelecek bir tarih olabilir.
                    // Burada örnek olarak Unix Epoch başlangıcını kullanıyoruz.
                    return new Date(0); // 1 Ocak 1970
                }
                const [day, month, year] = date.split('-').map(num => num.padStart(2, '0'));
                const [hours, minutes] = time.split(':').map(num => num.padStart(2, '0'));
                return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
            };

            const dateTimeA = convertDateTime(a.date, a.time);
            const dateTimeB = convertDateTime(b.date, b.time);

            return dateTimeB - dateTimeA;
        })
        setShortData(sortDataResult)

    }, [deepData])


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

                    <FaWindowClose size={30} color='red' cursor={'pointer'} onClick={handleClose} />

                    <Typography align='center' fontWeight={700}>{info} Datası</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3, mt: 5 }}>

                            <TableContainer component={Paper} sx={tableContainerStyle}>
                                <Table aria-label="a dense table">
                                    <TableHead sx={{ backgroundColor: '#000000' }}>
                                        <TableRow>
                                            <TableCell align='center' sx={tableCellStyle}>Kod</TableCell>
                                            <TableCell align='center' sx={tableCellStyle}>Tarih</TableCell>
                                            <TableCell align='center' sx={tableCellStyle}>Vardiya</TableCell>
                                            <TableCell align='center' sx={tableCellStyle}>Açıklama</TableCell>
                                            <TableCell align='center' sx={tableCellStyle}>Kontroleden Kişi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {shortData?.map((item, index) => (
                                            <TableRow
                                                key={index}
                                            >
                                                {
                                                    state.aksiyonSahibi == "SEKILLENDIRME" && <TableCell align="center">{item.urun_kodu}</TableCell>
                                                }
                                                {
                                                    state.aksiyonSahibi == "SIRLAMA" && <TableCell align="center">{item.is_merkezi}</TableCell>
                                                }
                                                {
                                                    state.aksiyonSahibi == "DEKORLAMA" && <TableCell align="center">{item.renk_kodu}</TableCell>
                                                }
                                                {
                                                    state.aksiyonSahibi == "HAMMADDE" && <TableCell align="center">{item.is_merkezi}</TableCell>
                                                }
                                                {
                                                    state.aksiyonSahibi == "DIJITALLOGO" && <TableCell align="center">{item.urun_kodu}</TableCell>
                                                }
                                                {
                                                    state.aksiyonSahibi == "DIJITALBASKI" && <TableCell align="center">{item.urun_kodu}</TableCell>
                                                }
                                                {
                                                    state.aksiyonSahibi == "AYAKTASLAMA" && <TableCell align="center">{item.urun_kodu}</TableCell>
                                                }
                                                {
                                                    state.aksiyonSahibi == "KALITEGUVENCE" && <TableCell align="center">{item.urun_kodu}</TableCell>
                                                }
                                                {
                                                    state.aksiyonSahibi == "FIRINLAR" && <TableCell align="center">{item.urun_kodu}</TableCell>
                                                }

                                                <TableCell align="center">{item.date}</TableCell>
                                                <TableCell align="center">{item.vardiya}</TableCell>
                                                <TableCell align="center">{item.aciklama}</TableCell>
                                                <TableCell align="center">{item.kontroleden_kisi}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>

                        <Box height={500} display={'flex'} justifyContent={'center'}>
                            <ResponsiveContainer width="80%" height="100%" >
                                {/* <Typography align='center' variant='subtitle1' sx={{ height: '20px', fontWeight: 700 }}>grafik</Typography> */}
                                <BarChart
                                    data={graphicDataInfo}
                                >
                                    <XAxis dataKey="count" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#FF6868">
                                        <LabelList dataKey="title" position="insideTop" fill='#000000' fontSize={12} />
                                        <LabelList dataKey="percent" position="center" fill='#000000' fontSize={12} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Box>

                </Box>
            </Modal>

        </div>
    )
}

export default DeepDetail_Modal