import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'




const DijitalLogo_DataTable = ({ setInfo, info, delHandleOpen, handleOpen }) => {

  const { dijitalLogoData } = useSelector((state) => state.arge)
  const [dijitalLogo, setdijitalLogo] = useState([])



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
          urun_kodu,
          kontroledilenAdet,
          hataliUrunSayisi,
          aciklama,
          banthizi,
          merkezleme,
          besleme,
          logosonrasi_istif,
          hatatanimi,
          hataliUrunYuzdesi,


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
                type: 'DijitalLogo',
                urun_kodu,
                kontroledilenAdet,
                hataliUrunSayisi,
                aciklama,
                banthizi,
                merkezleme,
                besleme,
                logosonrasi_istif,
                hatatanimi,
                hataliUrunYuzdesi,
              })
            }}

          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
            label="Delete"
            onClick={() => {
              delHandleOpen()
              setInfo({ id, type: 'DijitalLogo', aciklama })
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
      headerName: "Kontroleden Kişi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "kontroledilenAdet",
      headerName: "Kontrol Edilen Adet",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "hataliUrunSayisi",
      headerName: "Hatalı Ürün Sayısı",
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
      field: "banthizi",
      headerName: "Bant Hızı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "merkezleme",
      headerName: "Merkezleme",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "besleme",
      headerName: "Besleme",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "toplama",
      headerName: "Toplama",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "logosonrasi_istif",
      headerName: "Logo Sonrası İstif",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "hatatanimi",
      headerName: "Hata Tanımı",
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
      field: "aciklama",
      headerName: "Açıklama",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
   

  ];


  useEffect(() => {
    const dizi = Object.keys(dijitalLogoData).map(key => { return { id: key, ...dijitalLogoData[key] } })
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
    setdijitalLogo(dizi)
  }, [dijitalLogoData])


  return (

    <Box sx={{ pt: 5 }}>
      <DataGrid
        columns={dataGrid_Columns}
        rows={dijitalLogo}
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

export default DijitalLogo_DataTable