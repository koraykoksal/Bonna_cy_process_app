import React from 'react'
import { Box, Typography, Container, Grid, Button } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Rectangle } from 'recharts';
import { useState, useEffect } from 'react';

const GraphicChart = ({ uygunsuzlukDataTable, uygunsuzlukCount }) => {


    return (



        // <Box sx={{ display: 'flex', justifyContent: 'center'}} height={500}>

            <ResponsiveContainer width="80%" height="60%">
                <BarChart
                    data={uygunsuzlukDataTable}
                >
                    <XAxis dataKey="count" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8">
                        <LabelList dataKey="title" position="insideTop" fill='#ffffff' fontWeight={700} fontSize={12} />
                        <LabelList dataKey="percent" position="center" fill='#ffffff' fontWeight={700} fontSize={12} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>


        // </Box>



    )
}

export default GraphicChart