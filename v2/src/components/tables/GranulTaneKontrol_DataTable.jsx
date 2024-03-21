import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material'

const GranulTaneKontrol_DataTable = ({ handleOpen, delHandleOpen, setInfo, info }) => {

  const { granulTaneKontrolData } = useSelector((state) => state.arge)
  const [granulTaneData, setGranulTaneData] = useState([])


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
          date,
          time,
          vardiya,
          yogunluk,
          akis,
          bigbagkodu,
          nemdegeri,
          granulkodu,
          mikron500,
          mikron400,
          mikron315,
          mikron250,
          mikron200,
          mikron100,
          mikron100denKucuk,
          aciklama,
          vardiyasorumlusu,
          urun_kodu,
          kontroleden_kisi


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
                type: 'GranulTaneKontrol',
                date,
                time,
                vardiya,
                is_merkezi,
                yogunluk,
                akis,
                bigbagkodu,
                nemdegeri,
                granulkodu,
                mikron500,
                mikron400,
                mikron315,
                mikron250,
                mikron200,
                mikron100,
                mikron100denKucuk,
                aciklama,
                vardiyasorumlusu,
                urun_kodu,
                kontroleden_kisi
              })
            }}

          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
            label="Delete"
            onClick={() => {
              delHandleOpen()
              setInfo({ id, type: 'GranulTaneKontrol' })
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
      field: "yogunluk",
      headerName: "Yoğunluk",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "akis",
      headerName: "Akış",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "bigbagkodu",
      headerName: "BigBag Kodu",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "nemdegeri",
      headerName: "Nem Değeri",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "granulkodu",
      headerName: "Granül Kodu",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "mikron500",
      headerName: "500 Mikron",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "mikron400",
      headerName: "400 Mikron",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "mikron315",
      headerName: "315 Mikron",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "mikron250",
      headerName: "250 Mikron",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "mikron200",
      headerName: "200 Mikron",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "mikron100",
      headerName: "100 Mikron",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "mikron100denKucuk",
      headerName: "< 100",
      minWidth: 100,
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
   

  ];


  useEffect(() => {
    const dizi = Object.keys(granulTaneKontrolData).map(key => { return { id: key, ...granulTaneKontrolData[key] } })
    dizi.sort((a, b) => {
      const convertDateTime = (date, time) => {
        if (!date || !time) {
            // Eğer date veya time undefined veya boş string ise, geçerli bir tarih döndürmeyebilir.
            // Bu durumu ele almak için bir alternatif dönüş değeri sağlayabilirsiniz.
            // Örneğin, çok geçmiş veya gelecek bir tarih olabilir.
            // Burada örnek olarak Unix Epoch başlangıcını kullanıyoruz.
            return new Date(0); // 1 Ocak 1970
        }
        const [day, month, year] = date.split('-').map(num => num.padStart(2, '0'));
        const [hours, minutes] = time.split(':').map(num => num.padStart(2, '0'));
        return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
    };

    const dateTimeA = convertDateTime(a.date, a.time);
    const dateTimeB = convertDateTime(b.date, b.time);

      return dateTimeB - dateTimeA;
  })
    setGranulTaneData(dizi)
  }, [granulTaneKontrolData])


  return (
    <div>
      <Box sx={{ pt: 5 }}>
        <DataGrid
          columns={dataGrid_Columns}
          rows={granulTaneData}
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

    </div>
  )
}

export default GranulTaneKontrol_DataTable