import { Button, Typography } from '@mui/material'
import React from 'react'
import { newBtnStyle, typoStyle } from '../styles/globalStyle'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useArge from '../hooks/useArge'
import GranulTaneKontrolModal from '../components/modals/GranulTaneKontrolModal'
import DeleteModals from '../components/deleteModals/DeleteModals'
import GranulTaneKontrol_DataTable from '../components/tables/GranulTaneKontrol_DataTable'



const GranulTaneBoyut = () => {


    const { hammaddeMaterialCode, getWorkCenter, getFireData } = useArge()
    const { currentUser } = useSelector((state) => state.auth)

    let getVardiya = 0;
    const nowData = new Date()
    const currentdatetime = nowData.getDate() + "-" + (nowData.getMonth() + 1) + "-" + nowData.getFullYear()
    const currentTime = nowData.getHours() + ":" + nowData.getMinutes()


    const [delOpen, setdelOpen] = React.useState(false);
    const delHandleOpen = () => setdelOpen(true);
    const delHandleClose = () => setdelOpen(false);


    const getShift = () => {
        const now = new Date().getHours()

        if (now > 8 && now < 16) {
            getVardiya = 2
        }
        else if (now > 16 && now < 23) {
            getVardiya = 3
        }
        else {
            getVardiya = 1
        }

        return getVardiya

    }

    const [info, setInfo] = useState({
        department: "Hammadde",
        type: "GranulTaneKontrol",
        is_merkezi: "",
        yogunluk: "",
        akis: "",
        bigbagkodu: "",
        nemdegeri: "",
        granulkodu: "",
        mikron500: "",
        mikron400: "",
        mikron315: "",
        mikron250: "",
        mikron200: "",
        mikron100: "",
        mikron100denKucuk: "",
        aciklama: "",
        vardiyasorumlusu: "",
        urun_kodu: "",
        vardiya: getShift(),
        date: currentdatetime.toString(),
        time: currentTime.toString(),
        kontroleden_kisi: currentUser
    })

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setInfo({
            type: "GranulTaneKontrol",
            is_merkezi: "",
            yogunluk: "",
            akis: "",
            bigbagkodu: "",
            nemdegeri: "",
            granulkodu: "",
            mikron500: "",
            mikron400: "",
            mikron315: "",
            mikron250: "",
            mikron200: "",
            mikron100: "",
            mikron100denKucuk: "",
            aciklama: "",
            vardiyasorumlusu: "",
            urun_kodu: "",
            vardiya: getShift(),
            date: currentdatetime.toString(),
            time: currentTime.toString(),
            kontroleden_kisi: currentUser
        })
    }



    useEffect(() => {

        hammaddeMaterialCode()
        getWorkCenter()

        getFireData("GranulTaneKontrol")

    }, [])




    return (
        <div>

            <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
                Granül Tane Boyut Kontrol
            </Typography>

            <Button onClick={handleOpen} variant='outlined' sx={newBtnStyle}>New</Button>

            <DeleteModals delOpen={delOpen} delHandleClose={delHandleClose} delHandleOpen={delHandleOpen} setdelOpen={setdelOpen} info={info} />

            <GranulTaneKontrolModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} />

            <GranulTaneKontrol_DataTable handleOpen={handleOpen} delHandleOpen={delHandleOpen} setInfo={setInfo} info={info} />

        </div>
    )
}

export default GranulTaneBoyut