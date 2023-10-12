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
import CompressIcon from '@mui/icons-material/Compress';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import IronIcon from '@mui/icons-material/Iron';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ExtensionIcon from '@mui/icons-material/Extension';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import ImageIcon from '@mui/icons-material/Image';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import CameraIcon from '@mui/icons-material/Camera';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import PatternIcon from '@mui/icons-material/Pattern';

export const secondMenu=[

    {
        icon:<CompressIcon/>,
        title:"İzo Statik Pres",
        url:"/proses/izostatikpres"
    },
    {
        icon:<IronIcon/>,
        title:"Otomatik Torna",
        url:"/proses/otomatiktorna"
    },
    {
        icon:<CoffeeMakerIcon/>,
        title:"Man Torna, Dik Torna-Pres",
        url:"/proses/mandiktornapres"
    },
    {
        icon:<CompareArrowsIcon/>,
        title:"Yüksek Basınç",
        url:"/proses/yuksekbasinc"
    },
    {
        icon:<PatternIcon/>,
        title:"Döküm Hattı",
        url:"/proses/dokumhatti"
    },
    {
        icon:<ExtensionIcon/>,
        title:"Kulp Döküm Çamuru",
        url:"/proses/kulpdokum"
    },
    {
        icon:<ShapeLineIcon/>,
        title:"Hammadde Granül Kontrol",
        url:"/proses/granulkontrol"
    },
    {
        icon:<FormatPaintIcon/>,
        title:"Astarlama",
        url:"/proses/astarlama"
    },
    {
        icon:<InvertColorsIcon/>,
        title:"Reaktif",
        url:"/proses/reaktif"
    },{
        icon:<ErrorOutlineIcon/>,
        title:"Biskuvi Triyaj",
        url:"/proses/triyaj"
    },
    {
        icon:<ColorLensIcon/>,
        title:"Sırlama",
        url:"/proses/sirlama"
    },
    {
        icon:<WebStoriesIcon/>,
        title:"Dijital Logo Kontrol",
        url:"/proses/dijitallogo"
    },
    {
        icon:<LineStyleIcon/>,
        title:"Dekorlama",
        url:"/proses/dekorlama"
    },
    {
        icon:<ImageIcon/>,
        title:"Dijital Baskı Kontrol",
        url:"/proses/dijitalbaski"
    },
    {
        icon:<CoffeeIcon/>,
        title:"Nihai Ürün Kontrol",
        url:"/proses/nihaiurunkontrol"
    },
    {
        icon:<CameraIcon/>,
        title:"Ayak Taşlama",
        url:"/proses/ayaktaslama"
    },
]


const SecondMenu = ({handleDrawerClose}) => {

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
                    handleDrawerClose()
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