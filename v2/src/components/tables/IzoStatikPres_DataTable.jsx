import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import useArge from '../../hooks/useArge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'

const IzoStatikPres_DataTable = ({ setInfo, info, delHandleOpen, handleOpen }) => {


    const { izoStatikPresData } = useSelector((state) => state.arge)
    const [presData, setpresData] = useState([])

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
            field: "cap",
            headerName: "Çap",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "izobasinc",
            headerName: "İzo Statik Basınç",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "kapamabasinc",
            headerName: "Kapama Basınç",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "vakumdegeri",
            headerName: "Vakum Değeri",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "dolumsuresi",
            headerName: "Dolum Süresi",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "granulturu",
            headerName: "Granül/Big_Bag",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "catlakkontrol",
            headerName: "Çatlak",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "rotuskontrol",
            headerName: "Rötuş",
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
            field: "hamurunistif",
            headerName: "Ham Ürün",
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
                    cap,
                    izobasinc,
                    kapamabasinc,
                    vakumdegeri,
                    dolumsuresi,
                    granulturu,
                    urun_kodu,
                    catlakkontrol,
                    rotuskontrol,
                    yuzeykontrol,
                    hamurunistif,
                    uygunsuzluktipi,
                    aciklama,
                    vardiyasorumlusu,
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
                                type: 'IzoStatikPresData',
                                is_merkezi,
                                agirlik,
                                taban,
                                kenar,
                                pkenar,
                                cap,
                                izobasinc,
                                kapamabasinc,
                                vakumdegeri,
                                dolumsuresi,
                                granulturu,
                                urun_kodu,
                                catlakkontrol,
                                rotuskontrol,
                                yuzeykontrol,
                                hamurunistif,
                                uygunsuzluktipi,
                                aciklama,
                                vardiyasorumlusu,
                            })
                        }}

                    />,
                    <GridActionsCellItem
                        key={"delete"}
                        icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
                        label="Delete"
                        onClick={() => {
                            delHandleOpen()
                            setInfo({ id, type: 'IzoStatikPresData' })
                        }}

                    />,
                ]
            },
        },

    ];


    useEffect(() => {
        const dizi = Object.keys(izoStatikPresData).map(key => { return { id: key, ...izoStatikPresData[key] } })
        setpresData(dizi)
    }, [izoStatikPresData])


    return (

        <Box sx={{ pt: 5 }}>
            <DataGrid
                columns={dataGrid_Columns}
                rows={presData}
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

export default IzoStatikPres_DataTable