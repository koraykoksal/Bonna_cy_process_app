import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';
import useArge from '../../hooks/useArge';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 525,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};



const DeleteModals = ({ delOpen, delHandleClose, delHandleOpen, item }) => {


    const { removeFirebaseData, getIzoStatikPresData } = useArge()


    const handleSubmit = (e) => {
        e.preventDefault()
        removeFirebaseData(item)
        delHandleClose()
    }

    console.log(item)

    return (


        <div>

            <Modal
                keepMounted
                open={delOpen}
                onClose={delHandleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

                        <Typography align='center' variant='h5'>Kayıt Silinecek Emin Misiniz ?</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: 3 }}>

                            <Button variant='contained' color='success' onClick={handleSubmit}>Evet</Button>

                            <Button variant='outlined' color='error' onClick={delHandleClose}>Hayır</Button>
                        </Box>
                    </Box>



                </Box>
            </Modal>
        </div>

    )
}

export default DeleteModals