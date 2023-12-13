import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'


const GranulKontrol_DataTable = ({ setInfo, info, delHandleOpen, handleOpen }) => {

  const { granulKontrolData } = useSelector((state) => state.arge)
  const [granuldata, setGranuldata] = useState([])



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
      field: "is_merkezi",
      headerName: "İş Merkezi",
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
      field: "hammaddenem",
      headerName: "Hammadde Nem",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "prosesnem",
      headerName: "Proses Nem",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "bigbagtarih",
      headerName: "BigBag Tarih",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "bigbagkodu",
      headerName: "BigBag Kodu",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "granulkodu",
      headerName: "Granul Kodu",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "redkabul",
      headerName: "Red-Kabul",
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
      field: "vardiyasorumlusu",
      headerName: "Vardiya Sorumlusu",
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
      renderCell: ({ id,
        row: {
          is_merkezi,
          hammaddenem,
          prosesnem,
          bigbagtarih,
          bigbagkodu,
          granulkodu,
          redkabul,
          aciklama,
          vardiyasorumlusu,
          urun_kodu,

        } }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<AiFillEdit size={25} style={{ color: '#0802A3' }} cursor='pointer' />}
            label="Edit"
            onClick={() => {
              handleOpen()
              setInfo({
                id,
                type: 'GranulKontrol',
                is_merkezi,
                hammaddenem,
                prosesnem,
                bigbagtarih,
                bigbagkodu,
                granulkodu,
                redkabul,
                aciklama,
                vardiyasorumlusu,
                urun_kodu,
              })
            }}

          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
            label="Delete"
            onClick={() => {
              delHandleOpen()
              setInfo({ id, type: 'GranulKontrol' })
            }}

          />,
        ]
      },
    },

  ];


  useEffect(() => {
    const dizi = Object.keys(granulKontrolData).map(key => { return { id: key, ...granulKontrolData[key] } })
    setGranuldata(dizi)
  }, [granulKontrolData])




  return (

    <Box sx={{ pt: 5 }}>
      <DataGrid
        columns={dataGrid_Columns}
        rows={granuldata}
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

export default GranulKontrol_DataTable