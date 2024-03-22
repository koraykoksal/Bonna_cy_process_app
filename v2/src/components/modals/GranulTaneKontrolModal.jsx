import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';
import { Container, IconButton, TextField, TextareaAutosize } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { sorunTipi, aksiyonSahibi } from '../../helpers/ProcessData';
import Textarea from '@mui/joy/Textarea';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState, useEffect } from 'react';
import { uygunsuzlukTipi } from "../../helpers/ProcessData"
import { useSelector } from "react-redux"
import useArge from '../../hooks/useArge';

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


const GranulTaneKontrolModal = ({ open, handleClose, info, setInfo,workCenterCode }) => {


    const [search, setSearch] = useState(null)
    
    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const { getFireData, putFireData, postFireData } = useArge()


    const handleSubmit = (e) => {

        e.preventDefault()

        if (info.id) {
            putFireData('GranulTaneKontrol', info)
            getFireData("GranulTaneKontrol")
        }
        else {
            postFireData("GranulTaneKontrol", info)
            getFireData("GranulTaneKontrol")
        }

        handleClose()

    }

    

    return (
        <div>

            <Modal
                keepMounted
                open={open}
                onClose={() => {
                    handleClose()
                }}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2" color="#000000">
                            Granül Tane Kontrol
                        </Typography>

                        <IconButton onClick={() => handleClose()}>
                            <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
                        </IconButton>
                    </Box>


                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '550px' }} component='form' onSubmit={handleSubmit}>


                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

                            {/* makine */}
                            <FormControl fullWidth>
                                <InputLabel id="is_merkezi">Makine</InputLabel>
                                <Select
                                    required
                                    labelId="is_merkezi"
                                    id="is_merkezi"
                                    name='is_merkezi'
                                    label="is_merkezi"
                                    value={info.is_merkezi}
                                    onChange={handleChange}
                                >
                                    {
                                        workCenterCode?.filter(data => data.ISMERKEZI.includes('HM-SD')).map(({ ISMERKEZI, index }) => (
                                            <MenuItem key={index} value={ISMERKEZI}>{ISMERKEZI}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>


                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Granül Kodu"
                                name="granulkodu"
                                id="granulkodu"
                                type="text"
                                variant="outlined"
                                value={info.granulkodu}
                                onChange={handleChange}
                            />


                            <TextField
                                fullWidth
                                label="Bigbag Kodu"
                                name="bigbagkodu"
                                id="bigbagkodu"
                                type="text"
                                variant="outlined"
                                value={info.bigbagkodu}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                name="nemdegeri"
                                label="Nem Değeri"
                                id="nemdegeri"
                                type="text"
                                variant="outlined"
                                value={info.nemdegeri}
                                onChange={handleChange}
                            />

                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <TextField
                                fullWidth
                                label='Yoğunluk'
                                name="yogunluk"
                                id="yogunluk"
                                type="text"
                                variant="outlined"
                                value={info.yogunluk}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label='Akış'
                                name="akis"
                                id="akis"
                                type="text"
                                variant="outlined"
                                value={info.akis}
                                onChange={handleChange}
                            />
                        </Box>


                        <Typography align='center' variant='subtitle2'>Tane Boyutu Analizi</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>



                            <TextField
                                fullWidth
                                label="500 Mikron"
                                name="mikron500"
                                id="mikron500"
                                type="text"
                                variant="outlined"
                                value={info.mikron500}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="400 Mikron"
                                name="mikron400"
                                id="mikron400"
                                type="text"
                                variant="outlined"
                                value={info.mikron400}
                                onChange={handleChange}
                            />


                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>



                            <TextField
                                fullWidth
                                label="315 Mikron"
                                name="mikron315"
                                id="mikron315"
                                type="text"
                                variant="outlined"
                                value={info.mikron315}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="250 Mikron"
                                name="mikron250"
                                id="mikron250"
                                type="text"
                                variant="outlined"
                                value={info.mikron250}
                                onChange={handleChange}
                            />

                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>



                            <TextField
                                fullWidth
                                label="200 Mikron"
                                name="mikron200"
                                id="mikron200"
                                type="text"
                                variant="outlined"
                                value={info.mikron200}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="100 Mikron"
                                name="mikron100"
                                id="mikron100"
                                type="text"
                                variant="outlined"
                                value={info.mikron100}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="< 100"
                                name="mikron100denKucuk"
                                id="mikron100denKucuk"
                                type="text"
                                variant="outlined"
                                value={info.mikron100denKucuk}
                                onChange={handleChange}
                            />

                        </Box>


                        <TextField
                            multiline
                            fullWidth
                            label="Açıklama"
                            name="aciklama"
                            id="aciklama"
                            type="text"
                            variant="outlined"
                            value={info.aciklama}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            label="Vardiya Sorumlusu veya Operatör"
                            name="vardiyasorumlusu"
                            id="vardiyasorumlusu"
                            type="text"
                            variant="outlined"

                            value={info.vardiyasorumlusu}
                            onChange={handleChange}
                        />



                        <Button
                            variant='contained'
                            fullWidth
                            type='submit'
                        >
                            {info?.id ? "Update Data" : "Add New Data"}
                        </Button>


                    </Box>


                </Box>
            </Modal>

        </div>
    )
}

export default GranulTaneKontrolModal