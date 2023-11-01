import React from 'react'
import Typography from '@mui/material/Typography';
import { typoStyle } from "../styles/globalStyle"
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


const Home = () => {

  const { getDesenCode, getWorkCenter,getMaterialCenter } = useArge()
  const { workCenterCode, designCode } = useSelector((state) => state.arge)


  //? sayfa ilk yuklendiğinde desen kodlarını erp den çek
  useEffect(() => {

    getMaterialCenter()
    getDesenCode()
    getWorkCenter()

  }, [])


  

  return (

    <div>
      <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
        Dashboard
      </Typography>
    </div>
  )

}

export default Home