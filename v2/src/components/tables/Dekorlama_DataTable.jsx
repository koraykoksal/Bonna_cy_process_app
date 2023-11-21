import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'


const Dekorlama_DataTable = ({ setInfo, info, delHandleOpen, handleOpen }) => {

  const { dekorlamaData } = useSelector((state) => state.arge)
  const [dekorlama, setdekorlama] = useState([])


  const dataGrid_Columns = [
    // {
    //     field: "id",
    //     headerName: "ID",
    //     minWidth: 150,
    //     headerAlign: "center",
    //     align: "center",
    //     flex: 1,
    // },
    {
      field: "date",
      headerName: "Tarih",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Saat",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "vardiya",
      headerName: "Vardiya",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "kontroleden_kisi",
      headerName: "Kontrol Yapan",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "urun_kodu",
      headerName: "Ürün Kodu",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "silimsunger",
      headerName: "Silim Sünger",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "silimsuyu",
      headerName: "Silim Suyu",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "urunsilim",
      headerName: "Ürün Silim",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "boya_etiketi",
      headerName: "Boya Etiketi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "boya_cokme",
      headerName: "Boya Çökme",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "boya_lekesi",
      headerName: "Boya Lekesi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "aciklama",
      headerName: "Açıklama",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "#",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ id }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<AiFillEdit size={25} style={{ color: '#0802A3' }} cursor='pointer' />}
            label="Edit"
            onClick={() => {
              handleOpen()
              setInfo({ id, type: 'Dekorlama' })
            }}

          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
            label="Delete"
            onClick={() => {
              delHandleOpen()
              setInfo({ id, type: 'Dekorlama' })
            }}

          />,
        ]
      },
    },

  ];


  useEffect(() => {
    const dizi = Object.keys(dekorlamaData).map(key => { return { id: key, ...dekorlamaData[key] } })
    setdekorlama(dizi)
  }, [dekorlamaData])


  return (

    <Box sx={{ pt: 5 }}>
      <DataGrid
        columns={dataGrid_Columns}
        rows={dekorlama}
        pageSizeOptions={[10, 25, 50, 75, 100]}
        slots={{ toolbar: GridToolbar }}
        disableRowSelectionOnClick
        sx={{
          boxShadow: 4,
        }}
      />
    </Box>


  )
}

export default Dekorlama_DataTable