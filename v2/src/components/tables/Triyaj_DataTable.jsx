import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'


const Triyaj_DataTable = ({ setInfo, info, delHandleOpen, handleOpen }) => {

  const { triyajData } = useSelector((state) => state.arge)
  const [triyaj, setTriyaj] = useState([])

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
      field: "sekillendirmeYontemi",
      headerName: "Şekillendirme Yöntemi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "toplamAdet",
      headerName: "Toplam Adet",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "kontroledilenAdet",
      headerName: "Kontroledilen Adet",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "hataliUrunSayisi",
      headerName: "Hatali Ürün Sayısı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "karantina",
      headerName: "Karantina",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "firinkodu",
      headerName: "Fırın Kodu",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ayakcatlagi",
      headerName: "Ayak Çatlağı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "kenarCatlagi",
      headerName: "Kenar Çatlaği",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "firinKirigi",
      headerName: "Fırın Kırığı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "diger",
      headerName: "diger",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "hataliUrunYuzdesi",
      headerName: "Hatalı Ürün Yüzdesi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ayakCatlagiYuzdesi",
      headerName: "Ayak Çatlaği Yüzdesi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "kenarCatlagiYuzdesi",
      headerName: "Kenar Çatlagi Yüzdesi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "firinKirigiYuzdesi",
      headerName: "Fırın Kırığı Yüzdesi Tipi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "digerYuzdesi",
      headerName: "Diğer Yüzdesi Tipi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "biskuvifirinSorumlusu",
      headerName: "Bisküvi Fırın Sorumlusu",
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
      field: "aksiyon",
      headerName: "Aksiyon",
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
          urun_kodu,
          sekillendirmeYontemi,
          toplamAdet,
          kontroledilenAdet,
          hataliUrunSayisi,
          aciklama,
          aksiyon,
          karantina,
          firinkodu,
          biskuvifirinSorumlusu,
          ayakcatlagi,
          kenarCatlagi,
          firinKirigi,
          diger,
          hataliUrunYuzdesi,
          ayakCatlagiYuzdesi,
          kenarCatlagiYuzdesi,
          firinKirigiYuzdesi,
          digerYuzdesi,

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
                type: 'Triyaj',
                urun_kodu,
                sekillendirmeYontemi,
                toplamAdet,
                kontroledilenAdet,
                hataliUrunSayisi,
                aciklama,
                aksiyon,
                karantina,
                firinkodu,
                biskuvifirinSorumlusu,
                ayakcatlagi,
                kenarCatlagi,
                firinKirigi,
                diger,
                hataliUrunYuzdesi,
                ayakCatlagiYuzdesi,
                kenarCatlagiYuzdesi,
                firinKirigiYuzdesi,
                digerYuzdesi,
              })
            }}

          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
            label="Delete"
            onClick={() => {
              delHandleOpen()
              setInfo({ id, type: 'Triyaj' })
            }}

          />,
        ]
      },
    },

  ];


  useEffect(() => {
    const dizi = Object.keys(triyajData).map(key => { return { id: key, ...triyajData[key] } })
    setTriyaj(dizi)
  }, [triyajData])


  return (

    <Box sx={{ pt: 5 }}>
      <DataGrid
        columns={dataGrid_Columns}
        rows={triyaj}
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

export default Triyaj_DataTable