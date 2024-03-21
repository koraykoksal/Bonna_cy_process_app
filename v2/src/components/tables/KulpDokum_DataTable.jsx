import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'

const KulpDokum_DataTable = ({ setInfo, info, delHandleOpen, handleOpen }) => {

  const { kulpDokumData } = useSelector((state) => state.arge)
  const [kulpDokumHatti, setkulpDokumHatti] = useState([])



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
          agirlik,
          taban,
          kenar,
          pkenar,
          yogunluk,
          kurutmaSicaklik,
          t1,
          t2,
          t1t2,
          tankkaristirmahizi,
          istifsayisi,
          redkabul,
          kulpuyumu,
          uygunsuzluktipi,
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
                type: 'KulpDokum',
                is_merkezi,
                agirlik,
                taban,
                kenar,
                pkenar,
                yogunluk,
                kurutmaSicaklik,
                t1,
                t2,
                t1t2,
                tankkaristirmahizi,
                istifsayisi,
                redkabul,
                kulpuyumu,
                uygunsuzluktipi,
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
              setInfo({ id, type: 'KulpDokum' })
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
      minWidth: 80,
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
      field: "yogunluk",
      headerName: "Yoğunluk",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "kurutmaSicaklik",
      headerName: "Kurutma Sicaklığı",
      minWidth: 130,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "t1",
      headerName: "T1",
      minWidth: 80,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "t2",
      headerName: "T2",
      minWidth: 80,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "t1t2",
      headerName: "T1T2",
      minWidth: 80,
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
      field: "taban",
      headerName: "Taban",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "kenar",
      headerName: "Kenar",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "pkenar",
      headerName: "P_Kenar",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "istifsayisi",
      headerName: "İstif Sayisi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "tankkaristirmahizi",
      headerName: "Tank Karıştırma Hızı",
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
      field: "kulpuyumu",
      headerName: "Kulp Uyumu",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "uygunsuzlukTipi",
      headerName: "Uygunsuzluk Tipi",
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
    const dizi = Object.keys(kulpDokumData).map(key => { return { id: key, ...kulpDokumData[key] } })
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
    setkulpDokumHatti(dizi)
  }, [kulpDokumData])



  return (

    <Box sx={{ pt: 5 }}>
      <DataGrid
        columns={dataGrid_Columns}
        rows={kulpDokumHatti}
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

export default KulpDokum_DataTable