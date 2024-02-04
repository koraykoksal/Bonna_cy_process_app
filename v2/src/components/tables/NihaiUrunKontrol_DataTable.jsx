import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'

const NihaiUrunKontrol_DataTable = ({ setInfo, info, delHandleOpen, handleOpen }) => {

  const { nihaiUrunKontrolData } = useSelector((state) => state.arge)
  const [nihaiUrun, setnihaiUrun] = useState([])



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
      field: "renkKodu",
      headerName: "renkKodu",
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
      field: "agirlik",
      headerName: "Ağırlık",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "olculenNumuneSayisi",
      headerName: "Ölçülen Numune Sayısı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "cap_ab",
      headerName: "Çap-AB",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "cap_cd",
      headerName: "Çap-CD",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "cap_e1e2",
      headerName: "Çap_E1E2",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yukseklik_a",
      headerName: "Yükseklik-A",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yukseklik_b",
      headerName: "Yükseklik-B",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yukseklik_c",
      headerName: "Yükseklik-C",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yukseklik_d",
      headerName: "Yükseklik-D",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "icYukseklik",
      headerName: "İç Yukseklik",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "dudak_a",
      headerName: "Dudak-A",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "dudak_b",
      headerName: "Dudak-B",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "dudak_c",
      headerName: "Dudak-C",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "dudak_d",
      headerName: "Dudak-D",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ayakYuksekligi",
      headerName: "Ayak Yuksekliği",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "bombeCokme",
      headerName: "Bombe Çökme",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "duzlemdenSapma",
      headerName: "Düzlemden Sapma",
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
      renderCell: ({ id,
        row: {
          renkKodu,
          aciklama,
          urun_kodu,
          olculenNumuneSayisi,
          agirlik,
          cap_ab,
          cap_cd,
          cap_e1e2,
          yukseklik_a,
          yukseklik_b,
          yukseklik_c,
          yukseklik_d,
          icYukseklik,
          dudak_a,
          dudak_b,
          dudak_c,
          dudak_d,
          ayakYuksekligi,
          bombeCokme,
          duzlemdenSapma,
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
                type: 'NihaiUrunKontrol',
                renkKodu,
                aciklama,
                urun_kodu,
                olculenNumuneSayisi,
                agirlik,
                cap_ab,
                cap_cd,
                cap_e1e2,
                yukseklik_a,
                yukseklik_b,
                yukseklik_c,
                yukseklik_d,
                icYukseklik,
                dudak_a,
                dudak_b,
                dudak_c,
                dudak_d,
                ayakYuksekligi,
                bombeCokme,
                duzlemdenSapma,
              })
            }}

          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
            label="Delete"
            onClick={() => {
              delHandleOpen()
              setInfo({ id, type: 'NihaiUrunKontrol' })
            }}

          />,
        ]
      },
    },

  ];


  useEffect(() => {
    const dizi = Object.keys(nihaiUrunKontrolData).map(key => { return { id: key, ...nihaiUrunKontrolData[key] } })
    setnihaiUrun(dizi)
  }, [nihaiUrunKontrolData])


  return (

    <Box sx={{ pt: 5 }}>
      <DataGrid
        columns={dataGrid_Columns}
        rows={nihaiUrun}
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

export default NihaiUrunKontrol_DataTable