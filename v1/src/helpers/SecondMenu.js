import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export const secondMenu=[

    {
        icon:<BrightnessLowIcon/>,
        title:"İzo Statik Pres",
        url:"/proses/izostatikpres"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Otomatik Torna",
        url:"/proses/otomatiktorna"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Man Torna, Dik Torna-Pres",
        url:"/proses/mandiktornapres"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Yüksek Basınç",
        url:"/proses/yuksekbasinc"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Döküm Hattı",
        url:"/proses/dokumhatti"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Kulp Döküm Çamuru",
        url:"/proses/kulpdokum"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Hammadde Granül Kontrol",
        url:"/proses/granulkontrol"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Astarlama",
        url:"/proses/astarlama"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Reaktif",
        url:"/proses/reaktif"
    },{
        icon:<BrightnessLowIcon/>,
        title:"Biskuvi Triyaj",
        url:"/proses/triyaj"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Sırlama",
        url:"/proses/sirlama"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Dijital Logo Kontrol",
        url:"/proses/dijitallogo"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Dekorlama",
        url:"/proses/dekorlama"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Dijital Baskı Kontrol",
        url:"/proses/dijitalbaski"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Nihai Ürün Kontrol",
        url:"/proses/nihaiurunkontrol"
    },
    {
        icon:<BrightnessLowIcon/>,
        title:"Ayak Taşlama",
        url:"/proses/ayaktaslama"
    },
]


const SecondMenu = () => {

    const navigate = useNavigate()

  return (
    <div>
        <List>
        {secondMenu.map((item, index) => (
            <ListItem
                key={index}
                disablePadding
                onClick={() => {
                item.url.includes("http" || "www")
                    ? window.open(item.url, "_blank")
                    : navigate(item.url)
                }}
                sx={{
                color: "#ffffff",
                "& .MuiSvgIcon-root": { color: "#ffffff" },
                "&:hover": { color: "red" },
                "&:hover .MuiSvgIcon-root": { color: "red" },
                }}
            >
                <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} data-test='titleFirms' />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
    </div>
  )
}

export default SecondMenu