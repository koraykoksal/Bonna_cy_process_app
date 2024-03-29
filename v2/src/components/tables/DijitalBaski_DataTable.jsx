import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'


const DijitalBaski_DataTable = ({ setInfo, info, delHandleOpen, handleOpen }) => {

    const { dijitalBaskiData } = useSelector((state) => state.arge)
    const [dijitalBaski, setdijitalBaski] = useState([])

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
                    tasarim_kodu,
                    banthizi,
                    voltaj,
                    basinc,
                    mavi,
                    pembe,
                    sari,
                    kahverengi,
                    yesil,
                    siyah,
                    reaktif,
                    beyaz,
                    desenGorseli,
                    hataTanimi,
                    aciklama,
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
                                type: 'DijitalBaski',
                                urun_kodu,
                                tasarim_kodu,
                                banthizi,
                                voltaj,
                                basinc,
                                mavi,
                                pembe,
                                sari,
                                kahverengi,
                                yesil,
                                siyah,
                                reaktif,
                                beyaz,
                                desenGorseli,
                                hataTanimi,
                                aciklama,
                            })
                        }}

                    />,
                    <GridActionsCellItem
                        key={"delete"}
                        icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
                        label="Delete"
                        onClick={() => {
                            delHandleOpen()
                            setInfo({ id, type: 'DijitalBaski' })
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
            field: "tasarim_kodu",
            headerName: "Tasarım Kodu",
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
            field: "voltaj",
            headerName: "Voltaj",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "basinc",
            headerName: "Basınç",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "mavi",
            headerName: "Mavi",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "pembe",
            headerName: "Pembe",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "sari",
            headerName: "Sari",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "kahverengi",
            headerName: "Kahverengi",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yesil",
            headerName: "Yesil",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "siyah",
            headerName: "Siyah",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "reaktif",
            headerName: "Reaktif",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "beyaz",
            headerName: "Beyaz",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "desenGorseli",
            headerName: "Desen Gorseli",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "hataTanimi",
            headerName: "Hata Tanımı",
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
        const dizi = Object.keys(dijitalBaskiData).map(key => { return { id: key, ...dijitalBaskiData[key] } })
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
        setdijitalBaski(dizi)
    }, [dijitalBaskiData])


    return (

        <Box sx={{ pt: 5 }}>
            <DataGrid
                columns={dataGrid_Columns}
                rows={dijitalBaski}
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

export default DijitalBaski_DataTable