import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'


const ManDikTorna_DataTable = ({ setInfo, info, delHandleOpen, handleOpen }) => {

    const { manDikTornaData } = useSelector((state) => state.arge)
    const [tornaData, settornaData] = useState([])



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
            field: "aynacap",
            headerName: "Ayna Çap",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "camursert",
            headerName: "Çamur Sertlik",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "catlakkontrol",
            headerName: "Çatlak Kontrol",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yuzeykontrol",
            headerName: "Yüzey",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "rotuskontrol",
            headerName: "Rötüş Kontrol",
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
            field: "havakontrol",
            headerName: "Hava Kontrol",
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
            renderCell: ({ id }) => {
                return [
                    <GridActionsCellItem
                        key={"edit"}
                        icon={<AiFillEdit size={25} style={{ color: '#0802A3' }} cursor='pointer' />}
                        label="Edit"
                        onClick={() => {
                            handleOpen()
                            setInfo({ id ,type:'ManDikTorna'})
                        }}

                    />,
                    <GridActionsCellItem
                        key={"delete"}
                        icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
                        label="Delete"
                        onClick={() => {
                            delHandleOpen()
                            setInfo({ id ,type:'ManDikTorna'})
                        }}

                    />,
                ]
            },
        },

    ];


    useEffect(() => {
        const dizi = Object.keys(manDikTornaData).map(key => { return { id: key, ...manDikTornaData[key] } })
        settornaData(dizi)
    }, [manDikTornaData])


    return (

        <Box sx={{ pt: 5 }}>
            <DataGrid
                columns={dataGrid_Columns}
                rows={tornaData}
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

export default ManDikTorna_DataTable