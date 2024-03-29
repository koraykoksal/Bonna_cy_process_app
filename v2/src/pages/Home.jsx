import React from 'react'
import Typography from '@mui/material/Typography';
import useArge from '../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Avatar, Container, Grid, Paper, TextField } from '@mui/material';
import Dashboard_Cards from '../components/dashboards/Dashboard_Cards';
import HataBazli_Uygunsuzluk from '../components/dashboards/HataBazli_Uygunsuzluk';
import Uygunsuzluk_Table from '../components/dashboards/Uygunsuzluk_Table';
import { HiOutlineSearch } from "react-icons/hi";
import ActionDetail_Modal from '../components/detailModals/ActionDetail_Modal';
import Dashboard_Graphic from '../components/dashboards/Dashboard_Graphic';
import { toastWarnNotify } from '../helpers/ToastNotify';
import { SlRefresh } from "react-icons/sl";

const detailButtonStyle = {
  p: 2,
  textTransform: 'none',
  letterSpacing: 5,
  fontWeight: 700,
  fontSize: 17
}

const Home = () => {


  const { readFireData, getFireData, getDesenCode, getWorkCenter, getMaterialCenter, hammaddeMaterialCode } = useArge()
  const { dashboardData, uygunsuzlukData, dbData } = useSelector((state) => state.arge)

  const [prosesPlanaUygunluk, setprosesPlanaUygunluk] = useState(0)

  const [sorunTipleri, setSorunTipleri] = useState({});
  const [aksiyonSahibi, setaksiyonSahibi] = useState({})

  const [hataBazliUygunsuzlukMiktar, setHataBazliUygunsuzlukMiktar] = useState(0)
  const [bolumBazliUygunsuzlukMiktar, setBolumBazliUygunsuzlukMiktar] = useState(0)

  const [farkliSorunTipiSayisi, setFarkliSorunTipiSayisi] = useState(0);
  const [tekrarlananSorunTipleri, setTekrarlananSorunTipleri] = useState([]);


  const [farkliAksiyonTipiSayisi, setFarkliAksiyonTipiSayisi] = useState(0);
  const [tekrarlananAksyionTipleri, setTekrarlananAksiyonTipleri] = useState([]);

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  }

  const [info, setInfo] = useState({
    dateFrom: "",
    dateTo: ""
  })



  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }



  //sayfa render olduğu zaman çalıştır
  useEffect(() => {

    const storedInfo = JSON.parse(localStorage.getItem('lastSelectedDate'));

    if (storedInfo) {

      setInfo({ ...info, dateFrom: storedInfo.dateFrom, dateTo: storedInfo.dateTo })

      getFireData('Uygunsuzluk', storedInfo.dateFrom, storedInfo.dateTo)
      readFireData(storedInfo.dateFrom, storedInfo.dateTo)
    }
    else {
      readFireData(info.dateFrom, info.dateTo)
      getFireData('Uygunsuzluk', info.dateFrom, info.dateTo)
    }
    // readFireData(info.dateFrom, info.dateTo)
    // getFireData('Uygunsuzluk', info.dateFrom, info.dateTo)

  }, [])


  //! dashboard datası true ise uygunsuzluk oranı hesaplamasını yap
  useEffect(() => {

    const uygunlukOrani = (Number(dashboardData.toplamUygunsuzlukMiktar) / Number(dashboardData.toplamKontrolMiktar)) * 100
    setprosesPlanaUygunluk(uygunlukOrani.toFixed(1))

  }, [dashboardData])



  // useEffect(() => {

  //   const data = Object.values(uygunsuzlukData)

  //   //! Sorun tiplerini ayrıştır, boş string değerlerini elem
  //   const sorunTipleriDizisi = data.filter(kayit => kayit.sorun_tipi !== '').map(kayit => kayit.sorun_tipi);
  //   setSorunTipleri(sorunTipleriDizisi);

  //   //* new Set özelliği ile yalnızca benzersiz kayıtları al
  //   const benzersizSorunTipleri = new Set(sorunTipleriDizisi);
  //   setFarkliSorunTipiSayisi(benzersizSorunTipleri.size);


  //   // //! aksiyon sahibi tiplerini ayrıştır
  //   const aksiyonSahibiTipleriDizisi = data.map(kayit => kayit.aksiyon_sahibi);
  //   setaksiyonSahibi(aksiyonSahibiTipleriDizisi)

  //   const benzersizAksiyonTipleri = new Set(aksiyonSahibiTipleriDizisi)
  //   setFarkliAksiyonTipiSayisi(benzersizAksiyonTipleri.size)


  //   //! Sorun tiplerinin tekrar sayılarını hesaplama
  //   const sorunTipiSayilari = {};
  //   sorunTipleriDizisi.forEach(sorunTipi => {
  //     sorunTipiSayilari[sorunTipi] = (sorunTipiSayilari[sorunTipi] || 0) + 1;
  //   });

  //   //! İstenen formatta tekrarlanan sorun tiplerini ayarlama
  //   const tekrarlananSorunTipleri = Object.keys(sorunTipiSayilari).map(key => ({
  //     soruntipi: key,
  //     tekrar: sorunTipiSayilari[key]
  //   }))
  //   setTekrarlananSorunTipleri(tekrarlananSorunTipleri);


  //   // //! aksiyon sahibi tiplerinin tekrar sayılarını hesaplama
  //   const aksiyonSahibiTipiSayilari = {};
  //   aksiyonSahibiTipleriDizisi.forEach(aksiyonTipi => {
  //     aksiyonSahibiTipiSayilari[aksiyonTipi] = (aksiyonSahibiTipiSayilari[aksiyonTipi] || 0) + 1;
  //   });

  //   // //! İstenen formatta tekrarlanan sorun tiplerini ayarlama
  //   const tekrarlananAksiyonTipleri = Object.keys(aksiyonSahibiTipiSayilari).map(key => ({
  //     aksiyontipi: key,
  //     tekrar: aksiyonSahibiTipiSayilari[key]
  //   }));
  //   setTekrarlananAksiyonTipleri(tekrarlananAksiyonTipleri);

  // }, [uygunsuzlukData])


  useEffect(() => {
    // Verileri Object.values kullanarak diziye dönüştürme
    const data = Object.values(uygunsuzlukData);

    // Sorun tiplerini ve aksiyon sahiplerini filtreleyerek ve benzersiz hale getirme
    const benzersizSorunTipleri = [...new Set(data.filter(kayit => kayit.sorun_tipi !== '').map(kayit => kayit.sorun_tipi))];
    const benzersizAksiyonSahipleri = [...new Set(data.map(kayit => kayit.aksiyon_sahibi))];

    // Benzersiz değerlerin sayısını state'e aktarma
    setFarkliSorunTipiSayisi(benzersizSorunTipleri.length);
    setFarkliAksiyonTipiSayisi(benzersizAksiyonSahipleri.length);

    // Tekrar sayılarını hesaplama işlemini bir fonksiyona çıkarma
    const hesaplaTekrarSayilari = (dizi) => {
      return dizi.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      }, {});
    };

    // Sorun tipleri ve aksiyon sahipleri için tekrar sayılarını hesaplama
    const sorunTipiSayilari = hesaplaTekrarSayilari(data.filter(kayit => kayit.sorun_tipi !== '').map(kayit => kayit.sorun_tipi));
    const aksiyonSahibiSayilari = hesaplaTekrarSayilari(data.map(kayit => kayit.aksiyon_sahibi));

    // Hesaplanan tekrar sayılarını istenen formatta state'e aktarma
    setTekrarlananSorunTipleri(Object.entries(sorunTipiSayilari).map(([soruntipi, tekrar]) => ({ soruntipi, tekrar })));
    setTekrarlananAksiyonTipleri(Object.entries(aksiyonSahibiSayilari).map(([aksiyontipi, tekrar]) => ({ aksiyontipi, tekrar })));
  }, [uygunsuzlukData])



  // tarih filtreleme işlemini yap
  const handleDateFilter = () => {

    if (info.dateFrom && info.dateTo) {

      //! tarih filtreleme işleminde son seçilen sarih bilgisi localStorage taragında saklanır.
      localStorage.setItem('lastSelectedDate', JSON.stringify(info))

      getFireData('Uygunsuzluk', info.dateFrom, info.dateTo)
      readFireData(info.dateFrom, info.dateTo)

    }
    else {
      toastWarnNotify('Tarih bilgisini kontrol ediniz !')
    }

  }


  //tarih filtresini resetle
  const handleRefresh = () => {

    setInfo({
      dateFrom: "",
      dateTo: ""
    })

    //! tarih filtresini temizlediğinde localstorage kayıtlı olan tarih bilgisini boşalt
    localStorage.setItem('lastSelectedDate', JSON.stringify(""))

    // useState işlemlerinde set işlemi asenkron çalışıyor 
    // getFireData fonksiyonunu hemen çalıştırmak için info bilgisini string değer olarak göndermek daha uygun bir çözümdür
    getFireData('Uygunsuzluk', "", "")
    readFireData("", "")
  }




  return (


    <div>

      <Box py={6}>

        <Typography align='center' p={2} fontWeight={700} letterSpacing={5} fontSize={18}>Genel Özet</Typography>


        <Box display={'flex'} justifyContent={'space-between'} gap={2} alignItems={'center'} p={2}>

          <SlRefresh size={25} color='green' cursor={'pointer'}
            onClick={handleRefresh}
          />


          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, alignItems: 'center', p: 2 }}>
            <Typography>From</Typography>
            <TextField
              required
              id='dateFrom'
              name='dateFrom'
              type='date'
              value={info.dateFrom}
              onChange={handleChange}
            />

            <Typography>To</Typography>
            <TextField
              required
              id='dateTo'
              name='dateTo'
              type='date'
              value={info.dateTo}
              onChange={handleChange}
            />
            <HiOutlineSearch size={30} color='black' onClick={handleDateFilter} cursor={'pointer'} style={{ marginLeft: 15 }} />
          </Box>

        </Box>



        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>

          <Dashboard_Cards dashboardData={dashboardData} prosesPlanaUygunluk={prosesPlanaUygunluk} />
          <HataBazli_Uygunsuzluk farkliSorunTipiSayisi={farkliSorunTipiSayisi} farkliAksiyonTipiSayisi={farkliAksiyonTipiSayisi} />

        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <Button variant='outlined' sx={detailButtonStyle} color='success' onClick={handleOpen}>Aksiyon Sahipleri</Button>
        </Box>


        <Uygunsuzluk_Table tekrarlananAksyionTipleri={tekrarlananAksyionTipleri} tekrarlananSorunTipleri={tekrarlananSorunTipleri} />

      </Box>


      <Dashboard_Graphic tekrarlananAksyionTipleri={tekrarlananAksyionTipleri} tekrarlananSorunTipleri={tekrarlananSorunTipleri} />


      <ActionDetail_Modal open={open} handleClose={handleClose} handleOpen={handleOpen} dbData={dbData} tekrarlananAksyionTipleri={tekrarlananAksyionTipleri} />

    </div>
  )

}

export default Home