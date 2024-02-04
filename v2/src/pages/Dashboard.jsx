import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Container } from '@mui/material';
import useAuthCall from '../hooks/useAuthCall';
import FirstMenu from '../helpers/FirstMenu';
import SecondMenu from '../helpers/SecondMenu';
import { useSelector } from 'react-redux';
import Button from "@mui/material/Button"
import { Outlet, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import useArge from '../hooks/useArge';
import { useEffect, useState } from 'react';
import { FiLogOut } from "react-icons/fi";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const Dashboard = () => {

  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.auth)

  const { logout, signOut } = useAuthCall()

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };






  return (



    <Box sx={{ display: 'flex' }}>

      <CssBaseline />

      <AppBar position="fixed" open={open}>

        <Toolbar >

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}

          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            Proses Kontrol
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, alignItems: 'center' }}>
            <Typography>
              {currentUser}
            </Typography>

            {/* <Button variant='contained' color='error' onClick={() => signOut()}>Logout</Button> */}

            <FiLogOut size={27} color='#B80000' cursor='pointer' onClick={() => signOut()} />

            {/* <IconButton onClick={()=>logout()}>
            <LogoutIcon sx={{'&hover':{cursor:'pointer'},color:'#000000'}}/>
          </IconButton> */}
          </Box>


        </Toolbar>

      </AppBar>



      <Drawer variant="permanent" open={open} >

        <DrawerHeader sx={{ background: '#000000' }}>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{ background: '#ffffff' }} /> : <ChevronLeftIcon sx={{ background: '#ffffff' }} />}
          </IconButton>
        </DrawerHeader>

        {/* ÇİZGİ */}
        <Divider />

        <List sx={{ background: '#000000' }}>
          <FirstMenu handleDrawerClose={handleDrawerClose} />
        </List>

        {/* ÇİZGİ */}
        <Divider />

        <List sx={{ background: '#000000' }}>
          <SecondMenu handleDrawerClose={handleDrawerClose} />
        </List>




      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <Toolbar /> */}
        {/* burada kullanılan outlet dashboard içinde çağırılan sayfaların route işlemini yapıyor.
        nested olarak kullanılan yapılarda outlet bilgisini belirtmek gerekiyor. Outlet tagi onclick yapılacak yere yazılır. */}


        <Outlet />


      </Box>

    </Box>




  )
}

export default Dashboard