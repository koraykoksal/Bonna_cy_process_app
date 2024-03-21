import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'



const Sirlama_DataTable = ({ setInfo, info, delHandleOpen, handleOpen }) => {

  const { sirlamaData } = useSelector((state) => state.arge)
  const [sirlama, setSirlama] = useState([])

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
          renkKodu,
          ph,
          urun_kodu,
          uretimyeri,
          yogunluk,
          sirSicaklik,
          viskozite,
          viskozite_v1,
          viskozite_v2,
          viskozite_v1v2,
          tankKazan_KaristirmaHizi,
          balerinTurnetHizi,
          balerinGobekHizi,
          pompaBasinci,
          aktifNozulSayisi_alt,
          aktifNozulSayisi_ust,
          sirGramaji,
          sirKalinligi_taban,
          sirKalinligi_kenar,
          sirKalinligi_orta,
          biskuviKontrol,
          biskuviSilimi_silimSuyu,
          biskuviSilimi_silimSungeri,
          biskuviSilimi_urunSilimi,
          makineYikanmasi,
          manyetikYikanmasi,
          kazandaCokme,
          receteKontrolu,
          ayakSilimi_silimSungeri,
          ayakSilimi_urunAyakSilimi,
          sirliUrunYuzeyKontrolu,
          auraBoyaLekesiKontrol,
          auraBeklemeSuresiKontrol,
          uygunsuzlukTipi,
          aciklama,
          operator,
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
                type: 'Sirlama',
                renkKodu,
                ph,
                urun_kodu,
                uretimyeri,
                yogunluk,
                sirSicaklik,
                viskozite,
                viskozite_v1,
                viskozite_v2,
                viskozite_v1v2,
                tankKazan_KaristirmaHizi,
                balerinTurnetHizi,
                balerinGobekHizi,
                pompaBasinci,
                aktifNozulSayisi_alt,
                aktifNozulSayisi_ust,
                sirGramaji,
                sirKalinligi_taban,
                sirKalinligi_kenar,
                sirKalinligi_orta,
                biskuviKontrol,
                biskuviSilimi_silimSuyu,
                biskuviSilimi_silimSungeri,
                biskuviSilimi_urunSilimi,
                makineYikanmasi,
                manyetikYikanmasi,
                kazandaCokme,
                receteKontrolu,
                ayakSilimi_silimSungeri,
                ayakSilimi_urunAyakSilimi,
                sirliUrunYuzeyKontrolu,
                auraBoyaLekesiKontrol,
                auraBeklemeSuresiKontrol,
                uygunsuzlukTipi,
                aciklama,
                operator,
              })
            }}

          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
            label="Delete"
            onClick={() => {
              delHandleOpen()
              setInfo({ id, type: 'Sirlama' })
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
      field: "urun_kodu",
      headerName: "Ürün Kodu",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "renkKodu",
      headerName: "Renk Kodu",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "uretimyeri",
      headerName: "Üretim Yeri",
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
      field: "sirSicaklik",
      headerName: "Sır Sıcaklık",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ph",
      headerName: "Ph Değeri",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "viskozite_v1",
      headerName: "Viskozite v1",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "viskozite_v2",
      headerName: "Viskozite v2",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "viskozite_v1v2",
      headerName: "Viskozite v1-v2",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "tankKazan_KaristirmaHizi",
      headerName: "Tank Kazan Karıştırma Hızı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "balerinTurnetHizi",
      headerName: "Balerin Turnet Hızı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "balerinGobekHizi",
      headerName: "Balerin Göbek Hızı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "pompaBasinci",
      headerName: "Pompa Basıncı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "aktifNozulSayisi_alt",
      headerName: "Aktif Nozül Sayısı Alt",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "aktifNozulSayisi_ust",
      headerName: "Aktif Nozül Sayısı Üst",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "sirGramaji",
      headerName: "Sır Gramajı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "sirKalinligi_taban",
      headerName: "Sır Kalınlığı-Taban",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "sirKalinligi_kenar",
      headerName: "Sır Kalınlığı-Kenar",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "sirKalinligi_orta",
      headerName: "Sır Kalınlığı-Orta",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "biskuviKontrol",
      headerName: "Biskuvi Kontrol",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "biskuviSilimi_silimSuyu",
      headerName: "Bisküvi Silimi-Silim Suyu",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "biskuviSilimi_silimSungeri",
      headerName: "Bisküvi Silimi-Sünger Silimi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "biskuviSilimi_urunSilimi",
      headerName: "Bisküvi Silimi-Ürün Silimi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "makineYikanmasi",
      headerName: "Makine Yıkanması",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "manyetikYikanmasi",
      headerName: "Manyetik Yıkanması",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "kazandaCokme",
      headerName: "Kazanda Çökme",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "receteKontrolu",
      headerName: "Reçete Kontrolü",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ayakSilimi_silimSungeri",
      headerName: "Ayak Silimi-Silim Süngeri",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ayakSilimi_urunAyakSilimi",
      headerName: "Ayak Silimi-Ürün Ayak Silimi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "sirliUrunYuzeyKontrolu",
      headerName: "Sırlı Ürün Yuzey Kontrolü",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "auraBoyaLekesiKontrol",
      headerName: "Aura Boya Lekesi Kontrol",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "auraBeklemeSuresiKontrol",
      headerName: "Aura Bekleme Süresi Kontrol",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "uygunsuzluktipi",
      headerName: "Uygunsuzluk Tipi",
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
   

  ];


  useEffect(() => {
    const dizi = Object.keys(sirlamaData).map(key => { return { id: key, ...sirlamaData[key] } })
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
    setSirlama(dizi)
  }, [sirlamaData])


  return (

    <Box sx={{ pt: 5 }}>
      <DataGrid
        columns={dataGrid_Columns}
        rows={sirlama}
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

export default Sirlama_DataTable