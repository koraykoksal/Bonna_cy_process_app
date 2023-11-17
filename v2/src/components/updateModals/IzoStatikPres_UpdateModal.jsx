import React from 'react'







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



const IzoStatikPres_UpdateModal = ({open, handleClose, handleOpen }) => {

    return (


        <div>

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2" color="#000000">
                            İzostatik Pres
                        </Typography>

                        <IconButton onClick={handleClose}>
                            <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
                        </IconButton>
                    </Box>


                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '600px' }} component='form' onSubmit={handleSubmit}>


                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

                            {/* makine */}
                            <FormControl fullWidth>
                                <InputLabel id="is_merkezi">Makine</InputLabel>

                                <Select
                                    required
                                    labelId="is_merkezi"
                                    id="is_merkezi"
                                    name='is_merkezi'
                                    label="is_merkezi"
                                    value={izostatikData.is_merkezi}
                                    onChange={handleChange}
                                >
                                    {
                                        workCenterCode?.filter(data => data?.ISMERKEZI?.includes('SK-KP')).map(({ ISMERKEZI, index }) => (
                                            <MenuItem key={index} value={ISMERKEZI}>{ISMERKEZI}</MenuItem>
                                        ))
                                    }
                                </Select>

                            </FormControl>

                            {/* ürün kodu */}
                            <FormControl fullWidth>

                                <InputLabel id="urun_kodu">Ürün Kodu</InputLabel>
                                <Select
                                    required
                                    labelId="urun_kodu"
                                    id="urun_kodu"
                                    name='urun_kodu'
                                    label="urun_kodu"
                                    value={izostatikData.urun_kodu}
                                    onChange={handleChange}
                                >
                                    {
                                        materialCode?.map(({ MALZEMEKODU, index }) => (
                                            <MenuItem key={index} value={MALZEMEKODU}>{MALZEMEKODU}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                        </Box>


                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Ağırlık (gr)"
                                name="agirlik"
                                id="agirlik"
                                type="text"
                                variant="outlined"

                                value={izostatikData.agirlik}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Taban (mm) "
                                name="taban"
                                id="taban"
                                type="text"
                                variant="outlined"

                                value={izostatikData.taban}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Kenar (mm)"
                                name="kenar"
                                id="kenar"
                                type="text"
                                variant="outlined"

                                value={izostatikData.kenar}
                                onChange={handleChange}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="P.Kenar (mm)"
                                name="pkenar"
                                id="pkenar"
                                type="text"
                                variant="outlined"

                                value={izostatikData.pkenar}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Çap (mm)"
                                name="cap"
                                id="cap"
                                type="text"
                                variant="outlined"

                                value={izostatikData.cap}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="İzostatik Basınç (bar)"
                                name="izobasinc"
                                id="izobasinc"
                                type="text"
                                variant="outlined"

                                value={izostatikData.izobasinc}
                                onChange={handleChange}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Kapama Basınç (bar)"
                                name="kapamabasinc"
                                id="kapamabasinc"
                                type="text"
                                variant="outlined"

                                value={izostatikData.kapamabasinc}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Vakum Değeri"
                                name="vakumdegeri"
                                id="vakumdegeri"
                                type="text"
                                variant="outlined"

                                value={izostatikData.vakumdegeri}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Dolum Süresi (sn)"
                                name="dolumsuresi"
                                id="dolumsuresi"
                                type="text"
                                variant="outlined"

                                value={izostatikData.dolumsuresi}
                                onChange={handleChange}
                            />
                        </Box>



                        {/* granül türü */}
                        <TextField
                            fullWidth
                            label="Granül Türü / BigBag Kodu"
                            name="granulturu"
                            id="granulturu"
                            type="text"
                            variant="outlined"

                            value={izostatikData.granulturu}
                            onChange={handleChange}
                        />


                        {/* uygunsuz işlem - standart değer */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>

                            <FormControl fullWidth>
                                <InputLabel id="catlakkontrol">ÇK</InputLabel>
                                <Select
                                    labelId="catlakkontrol"
                                    id="catlakkontrol"
                                    name='catlakkontrol'
                                    label="catlakkontrol"
                                    value={izostatikData.catlakkontrol}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="OK">OK</MenuItem>
                                    <MenuItem value="NOK">NOK</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="rotuskontrol">RK</InputLabel>
                                <Select
                                    labelId="rotuskontrol"
                                    id="rotuskontrol"
                                    name='rotuskontrol'
                                    label="rotuskontrol"
                                    value={izostatikData.rotuskontrol}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="OK">OK</MenuItem>
                                    <MenuItem value="NOK">NOK</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="yuzeykontrol">YK</InputLabel>
                                <Select
                                    labelId="yuzeykontrol"
                                    id="yuzeykontrol"
                                    name='yuzeykontrol'
                                    label="yuzeykontrol"
                                    value={izostatikData.yuzeykontrol}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="OK">OK</MenuItem>
                                    <MenuItem value="NOK">NOK</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="hamurunistif">HUİ</InputLabel>
                                <Select
                                    labelId="hamurunistif"
                                    id="hamurunistif"
                                    name='hamurunistif'
                                    label="hamurunistif"
                                    value={izostatikData.hamurunistif}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="OK">OK</MenuItem>
                                    <MenuItem value="NOK">NOK</MenuItem>
                                </Select>
                            </FormControl>

                        </Box>

                        {/* aksiyon sahibi */}
                        <FormControl fullWidth>
                            <InputLabel id="uygunsuzluktipi">Uygunsuzluk Tipi</InputLabel>
                            <Select
                                labelId="uygunsuzluktipi"
                                id="uygunsuzluktipi"
                                name='uygunsuzluktipi'
                                label="uygunsuzluktipi"
                                value={izostatikData.uygunsuzluktipi}
                                onChange={handleChange}
                            >
                                {
                                    uygunsuzlukTipi.map((item, index) => (
                                        <MenuItem key={index} value={item.text}>{item.text}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>



                        <TextField
                            multiline
                            fullWidth
                            label="Açıklama"
                            name="aciklama"
                            id="aciklama"
                            type="text"
                            variant="outlined"
                            value={izostatikData.aciklama}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            label="Vardiya Sorumlusu veya Operatör"
                            name="vardiyasorumlusu"
                            id="vardiyasorumlusu"
                            type="text"
                            variant="outlined"

                            value={izostatikData.vardiyasorumlusu}
                            onChange={handleChange}
                        />



                        <Button
                            variant='contained'
                            fullWidth
                            type='submit'
                        >
                            Save
                        </Button>


                    </Box>


                </Box>
            </Modal>
        </div>


    )
}

export default IzoStatikPres_UpdateModal