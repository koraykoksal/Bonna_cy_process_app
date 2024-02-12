import React from 'react'
import { Box, Typography, Container, Grid, Button } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Rectangle } from 'recharts';
import { useState, useEffect } from 'react';

const GraphicChart = ({ uygunsuzlukDataTable }) => {

    return (

        <div>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3, mt: 5 }}>

                {/* <Typography variant='subtitle2' fontWeight={700} align='center'>Grafik</Typography> */}
                {/* <ResponsiveContainer width="100%" height="100%"> */}
                <BarChart
                    width={700}
                    height={300}
                    data={uygunsuzlukDataTable}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="count" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* <Bar dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} /> */}
                    <Bar dataKey="count" fill="#8884d8">
                        <LabelList dataKey="title" position="insideTop" fill='#000000' fontSize={13} />

                    </Bar>
                </BarChart>
                {/* </ResponsiveContainer> */}


            </Box>


        </div>
    )
}

export default GraphicChart