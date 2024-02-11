import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField, Typography } from '@mui/material';
import { FaWindowClose } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SekillendirmeData, SirlamaData } from '../../helpers/ProcessData';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'

};


const tableCellStyle = {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
}

const tableContainerStyle = {
    maxHeight: '350px',
    overflow: 'auto'
}



const DetailModal = ({ open, handleClose, handleOpen, dbData, tekrarlananAksyionTipleri, tekrarlananSorunTipleri }) => {


    const [matchedCounts, setMatchedCounts] = useState({});
    const [uygunsuzlukOranlari, setUygunsuzlukOranlari] = useState([]);


    const [info, setInfo] = useState({
        dateFrom: "",
        dateTo: ""
    })

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }




    //! tekrarlanan aksiyon tiplerinde kontrol sayısını çıkar
    useEffect(() => {

        const tempResults = tekrarlananAksyionTipleri.map(action => {

            const actionKey = action.aksiyontipi.replace(/\s+/g, '') // boşluık karakterini kaldır
            let kontrolSayisi = 0;

            //! actionKey değeri SEKILLENDIRME VEYA SIRLAMA gelirse aşağıdaki condition bloğunu uygula
            if (actionKey == "SEKILLENDIRME") {

                SekillendirmeData.forEach(eslesmeAnahtari => {
                    if (Object.keys(dbData).includes(eslesmeAnahtari)) {
                        kontrolSayisi += Object.keys(dbData[eslesmeAnahtari]).length;
                    }
                })
            }
            else if (actionKey == "SIRLAMA") {

                SirlamaData.forEach(eslesmeAnahtari => {
                    if (Object.keys(dbData).includes(eslesmeAnahtari)) {
                        kontrolSayisi += Object.keys(dbData[eslesmeAnahtari]).length;
                    }
                })

            }
            else {
                Object.keys(dbData).forEach(key => {

                    const keys = key.replace(/\s+/g, '').toUpperCase()
                    const text = actionKey.replace(/\s+/g, '').toUpperCase()

                    if (keys === text) {

                        kontrolSayisi += Object.keys(dbData[key]).length; // Eşleşen kayıtların sayısını hesapla
                    }

                });
            }

            return {
                aksiyonSahibi: actionKey, // Orjinal aksiyon tipi
                kontrolSayisi: kontrolSayisi // Hesaplanan kontrol sayısı
            };

        }).filter(result => result.kontrolSayisi > 0)// Sadece kontrol sayısı 0'dan büyük olanları filtrele

        setMatchedCounts(tempResults)

    }, [tekrarlananAksyionTipleri, dbData])




    //! aksiyon sahibi uygunsuzluk oranını belirle
    useEffect(() => {

        const sonuc = tekrarlananAksyionTipleri.map(tekrarlanan => {

            const aksiyontipi = tekrarlanan.aksiyontipi.replace(/\s+/g, '').toUpperCase()

            const matched = matchedCounts.find(match => match.aksiyonSahibi == aksiyontipi)

            if (matched) {

                return {
                    aksiyonSahibi: matched.aksiyonSahibi,
                    uygunsuzlukOrani: Number(tekrarlanan.tekrar) / Number(matched.kontrolSayisi)
                }
            }

            return null

        }).filter(result => result !== null) // null değerleri filtrele

        setUygunsuzlukOranlari(sonuc)

    }, [matchedCounts])





    // console.log("tekrarlananAksyionTipleri: ",tekrarlananAksyionTipleri)
    // console.log("matched data: ", matchedCounts)
    console.log(dbData)


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
                            <HiOutlineSearch size={30} color='blue' cursor={'pointer'} style={{ marginLeft: 15 }} />
                        </Box>

                    </Box>


                    <Box mt={5}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead sx={{ backgroundColor: '#000000' }}>
                                <TableRow>
                                    <TableCell align='center' sx={tableCellStyle}>Aksiyon Sahibi</TableCell>
                                    <TableCell align="center" sx={tableCellStyle}>Uygunsuzluk Oranı</TableCell>
                                    <TableCell align="center" sx={tableCellStyle}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {uygunsuzlukOranlari.map((item, index) => (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell align="center">{item.aksiyonSahibi}</TableCell>
                                        <TableCell align="center">{item.uygunsuzlukOrani.toFixed(2)} %</TableCell>
                                        <TableCell align="center">
                                            <Button variant='contained' sx={{ textTransform: 'none', height: '100%' }} color='info'>Detay</Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>



                </Box>

            </Modal>

        </div>


    )
}

export default DetailModal