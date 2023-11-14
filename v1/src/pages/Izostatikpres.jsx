import { Box, Typography } from '@mui/material'
import React from 'react'
import { typoStyle } from "../styles/globalStyle"
import IzostatikPresModal from '../components/modals/IzostatikPresModal';
import useArge from '../hooks/useArge';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";



const columns = [
  { id: 'tarih', label: 'Tarih', minWidth: 170,align:'center' },
  { id: 'saat', label: 'Saat', minWidth: 80 ,align:'center'},
  { id: 'vardiya', label: 'Vardiya', minWidth: 80 ,align:'center'},
  {
    id: 'kontrol_yapan',
    label: 'Kontrol Yapan',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'is_merkezi',
    label: 'İş Merkezi',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'urun_kodu',
    label: 'Ürün Kodu',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'agirlik',
    label: 'Ağırlık',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'taban',
    label: 'Taban',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'kenar',
    label: 'Kenar',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'pkenar',
    label: 'P_Kenar',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'cap',
    label: 'Çap',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'izostatik_basinc',
    label: 'İzoStatik Basınç',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'kapama_basinc',
    label: 'Kapama Basınç',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'vakum_degeri',
    label: 'Vakum Değeri',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'dolum_suresi',
    label: 'Dolum Süresi',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'granul_bigbag',
    label: 'Granül/Big_Bag',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'catlak',
    label: 'Çatlak',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'rotus',
    label: 'Rötuş',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'yuzey',
    label: 'Yüzey',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'ham_urun',
    label: 'Ham Ürün',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'uygunsuzluk_tipi',
    label: 'Uygunsuzluk Tipi',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'aciklama',
    label: 'Açıklama/Aksiyon',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'vardiya_sorumlusu',
    label: 'Vardiya Sorumlusu/Operatör',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'edit',
    label: 'Edit',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'delete',
    label: 'Delete',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];


const Izostatikpres = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { getIzoStatikPresData } = useArge()
  const { workCenterCode, materialCode, izoStatikPresData } = useSelector((state) => state.arge)

  const [presData, setpresData] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {

    getIzoStatikPresData()
    const dizi = Object.keys(izoStatikPresData).map(key => { return { id: key, ...izoStatikPresData[key] } })

    setpresData(dizi)

    
  }, [])

  console.log(presData)

  return (

    <div>
      <Typography mt={8} align='center' variant='subtitle1' sx={typoStyle}>
        İzostatik Pres
      </Typography>

      <Button onClick={handleOpen} variant='outlined'>New</Button>

      <Box>
        <IzostatikPresModal open={open} handleClose={handleClose} handleOpen={handleOpen} setOpen={setOpen} />
      </Box>


      <Box sx={{ pt: 5 }}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth,backgroundColor:'#000000',color:'#ffffff',fontWeight:700 }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {presData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                        <TableCell align="center">{item.date}</TableCell>
                        <TableCell align="center">{item.time}</TableCell>
                        <TableCell align="center">{item.vardiya}</TableCell>
                        <TableCell align="center">{item.kontroleden_kisi}</TableCell>
                        <TableCell align="center">{item.is_merkezi}</TableCell>
                        <TableCell align="center">{item.urun_kodu}</TableCell>
                        <TableCell align="center">{item.agirlik}</TableCell>
                        <TableCell align="center">{item.taban}</TableCell>
                        <TableCell align="center">{item.kenar}</TableCell>
                        <TableCell align="center">{item.pkenar}</TableCell>
                        <TableCell align="center">{item.cap}</TableCell>
                        <TableCell align="center">{item.izobasinc}</TableCell>
                        <TableCell align="center">{item.kapamabasinc}</TableCell>
                        <TableCell align="center">{item.vakumdegeri}</TableCell>
                        <TableCell align="center">{item.dolumsuresi}</TableCell>
                        <TableCell align="center">{item.granulturu}</TableCell>
                        <TableCell align="center">{item.catlakkontrol}</TableCell>
                        <TableCell align="center">{item.rotuskontrol}</TableCell>
                        <TableCell align="center">{item.yuzeykontrol}</TableCell>
                        <TableCell align="center">{item.hamurunistif}</TableCell>
                        <TableCell align="center">{item.uygunsuzluktipi}</TableCell>
                        <TableCell align="center">{item.aciklama}</TableCell>
                        <TableCell align="center">{item.vardiyasorumlusu}</TableCell>
                        <TableCell align="center">
                          <AiFillEdit size={25} style={{color:'#0802A3'}} cursor='pointer'/>
                        </TableCell>
                        <TableCell align="center">
                          <MdDelete size={25} style={{color:'#D80032'}} cursor='pointer'/>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={columns.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

      </Box>




    </div>

  )
}

export default Izostatikpres