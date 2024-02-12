import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'

const ActionDetail = () => {


    const { state } = useLocation()
    const { id } = useParams()
    const navigate = useNavigate()

    const { dashboardData, uygunsuzlukData, dbData } = useSelector((state) => state.arge)

    useEffect(() => {
      
        console.log(dbData)



    }, [state])
    





    return (
        <div>

            <Box sx={{ pt: 10 }}>
                <Button variant='contained' color='info' sx={{textTransform:'none'}} onClick={() => navigate(-1)}>Geri</Button>
                <Typography align='center' fontWeight={700}>{state} DETAY</Typography>
            </Box>



        </div>
    )
}

export default ActionDetail