import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField, Typography } from '@mui/material';
import { FaWindowClose } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


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



const DetailModal = ({ open, handleClose, handleOpen, tekrarlananAksyionTipleri, tekrarlananSorunTipleri }) => {

    const { dashboardData, uygunsuzlukData, dbData } = useSelector((state) => state.arge)

    const [info, setInfo] = useState({
        dateFrom: "",
        dateTo: ""
    })

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }


    useEffect(() => {

        let dizi = []
        const res = Object.values(uygunsuzlukData)

        tekrarlananAksyionTipleri.forEach(element => {
            const data = res.filter(item => element.aksiyontipi === item.aksiyon_sahibi);
            // Düz bir dizi oluşturmak için concat kullanıyoruz
            dizi = dizi.concat(data);
        });

        console.log(dizi)

    }, [tekrarlananAksyionTipleri])



    // console.log(dbData)


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
                            <HiOutlineSearch size={30} cursor={'pointer'} style={{ marginLeft: 15 }} />
                        </Box>

                    </Box>



                </Box>

            </Modal>

        </div>


    )
}

export default DetailModal