import React from 'react'
import { Box, Typography, Container, Grid, Button } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Rectangle } from 'recharts';
import { useState, useEffect } from 'react';

const GraphicChart = ({ uygunsuzlukDataTable, uygunsuzlukCount }) => {

    console.log(uygunsuzlukDataTable)


    return (

        <div>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3, mt: 5 }}>

                {/* <ResponsiveContainer width="100%" height="100%"> */}
                <BarChart
                    width={700}
                    height={400}
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
                    <Bar dataKey="count" fill="#8884d8">
                        <LabelList dataKey="title" position="insideTop" fill='#000000' fontSize={12} />
                        <LabelList dataKey="percent" position="center" fill='#000000' fontSize={12} />
                    </Bar>
                </BarChart>
                {/* </ResponsiveContainer> */}


            </Box>


        </div>
    )
}

export default GraphicChart