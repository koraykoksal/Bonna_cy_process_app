import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'



const Astarlama_DataTable = ({ setInfo, info, delHandleOpen, handleOpen }) => {

  const { astarlamaData } = useSelector((state) => state.arge)
  const [astarlama, setAstarlama] = useState([])



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
      field: "actions",
      headerName: "#",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ id,
        row: {
          is_merkezi,
          yogunluk,
          nozzlecap,
          kasetsicaklik,
          tankbasinc,
          astarkalinlik,
          astarlamayapankisi,
          aciklama,
          redkabul,
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
                type: 'Astarlama',
                is_merkezi,
                yogunluk,
                nozzlecap,
                kasetsicaklik,
                tankbasinc,
                astarkalinlik,
                astarlamayapankisi,
                aciklama,
                redkabul,
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
              setInfo({ id, type: 'Astarlama' })
            }}

          />,
        ]
      },
    },
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
    // {
    //   field: "kontroleden_kisi",
    //   headerName: "Kontrol Yapan",
    //   minWidth: 150,
    //   headerAlign: "center",
    //   align: "center",
    //   flex: 1,
    // },

    {
      field: "yogunluk",
      headerName: "Yoğunluk",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "nozzlecap",
      headerName: "Nozzle Çap",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "kasetsicaklik",
      headerName: "Kaset Sıcaklık",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "tankbasinc",
      headerName: "Tank Basınç",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "astarkalinlik",
      headerName: "Astar Kalınlık",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "astarlamayapankisi",
      headerName: "Astarlama Yapan",
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
   

  ];


  useEffect(() => {
    const dizi = Object.keys(astarlamaData).map(key => { return { id: key, ...astarlamaData[key] } })
    dizi.sort((a, b) => {
      const convertDateTime = (date, time) => {
          const [day, month, year] = date.split('-').map(num => num.padStart(2, '0')); // Gün ve ayı iki haneli yap
          const [hours, minutes] = time.split(':').map(num => num.padStart(2, '0')); // Saati iki haneli yap
          return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
      };

      const dateTimeA = convertDateTime(a.date, a.time);
      const dateTimeB = convertDateTime(b.date, b.time);

      return dateTimeB - dateTimeA;
  })
    setAstarlama(dizi)
  }, [astarlamaData])


  return (

    <Box sx={{ pt: 5 }}>
      <DataGrid
        columns={dataGrid_Columns}
        rows={astarlama}
        initialState={{
          pagination: {
              paginationModel: {
                  pageSize: 10,
              },
          },
      }}
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

export default Astarlama_DataTable