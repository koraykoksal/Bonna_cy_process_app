import React from 'react'
import Typography from '@mui/material/Typography';
import { typoStyle } from "../styles/globalStyle"
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

const Home = () => {

  const { getDesenCode, getWorkCenter, getMaterialCenter,hammaddeMaterialCode } = useArge()

  const { designCode, materialCode, workCenterCode } = useSelector((state) => state.arge)

  //? sayfa ilk yuklendiğinde desen kodlarını erp den çek
  // useEffect(() => {

  //   getMaterialCenter()
  //   getDesenCode()
  //   getWorkCenter()
  //   hammaddeMaterialCode()
  // }, [])


  // console.log("desingCode: ", designCode)
  // console.log("materialCode: ", materialCode)
  // console.log("workCenter:", workCenterCode)




  return (

    <div>
      <Typography mt={8} align='center' variant='h5' fontWeight={700} sx={typoStyle}>
        Dashboard
      </Typography>
    </div>
  )

}

export default Home