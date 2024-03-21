import React from 'react'
import { Box, Typography, Container, Grid, Button } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Rectangle } from 'recharts';


const Dashboard_Graphic = ({ tekrarlananAksyionTipleri, tekrarlananSorunTipleri }) => {


    return (
        <Box height={600} display={'flex'} justifyContent={'center'} gap={8} flexWrap={'wrap'}>

            <ResponsiveContainer width="100%" height="100%">
                <Typography align='center' variant='subtitle1' sx={{height:'20px',fontWeight:700}}>Bölüm Uygunsuzluk</Typography>
                <BarChart
                    // width={600}
                    // height={400}
                    data={tekrarlananAksyionTipleri}
                >
                    <XAxis dataKey="tekrar" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tekrar" fill="#F3B95F">
                        <LabelList dataKey="aksiyontipi" position="insideTop" fill='#000000' fontSize={12} />

                    </Bar>

                </BarChart>
            </ResponsiveContainer>


            <ResponsiveContainer width="100%" height="100%">
            <Typography align='center' variant='subtitle1' sx={{height:'20px',fontWeight:700}}>Uygunsuzluk Çeşidi</Typography>
                <BarChart
                    // width={600}
                    // height={400}
                    data={tekrarlananSorunTipleri}
                >
                    {/* <XAxis dataKey="tekrar" /> */}
                    <XAxis dataKey="soruntipi" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tekrar" fill="#FF6868">
                        <LabelList dataKey="tekrar" position="insideTop" fill='#000000' fontSize={14} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>


        </Box>
    )
}

export default Dashboard_Graphic