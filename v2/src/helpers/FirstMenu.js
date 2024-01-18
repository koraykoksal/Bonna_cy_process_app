
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
import { Button } from '@mui/material';

export const firstMenu=[
    {
        icon:<DashboardIcon/>,
        title:"Dashboard",
        url:"/proses/"
    },
    {
        icon:<DisabledByDefaultIcon/>,
        title:"Uygunsuzluk",
        url:"/proses/uygunsuzluk"
    },
    // {
    //     icon:<BubbleChartIcon/>,
    //     title:"Reaktif Standartlar",
    //     url:"/proses/reaktifstandart"
    // }
]


const FirstMenu = ({handleDrawerClose}) => {

    const navigate = useNavigate()

  return (
    <div>

    <List>
        {firstMenu.map((item, index) => (
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

export default FirstMenu